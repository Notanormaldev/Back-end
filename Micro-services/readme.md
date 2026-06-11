# System Architecture Guide

> A complete guide to Monolithic, Microservices, Sync/Async Communication, and Distributed Systems — when to use what and why.

---

## Table of Contents

1. [Monolithic Architecture](#1-monolithic-architecture)
2. [Microservices Architecture](#2-microservices-architecture)
3. [Sync vs Async in Microservices](#3-sync-vs-async-in-microservices)
4. [Distributed Systems](#4-distributed-systems)
5. [When to Use What](#5-when-to-use-what)

---

## 1. Monolithic Architecture

### What is it?

A Monolithic application is one where **everything lives in a single codebase and runs as a single process**. Auth, products, orders, notifications — all in one place, deployed together.

```
project/
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── notifications.js
├── models/
├── server.js        ← everything runs from here
└── package.json
```

### How it runs

```
┌─────────────────────────────────────┐
│            Single Server            │
│                                     │
│  Auth + Products + Orders +         │
│  Notifications + Payments           │
│                                     │
│  One process. One deploy.           │
└─────────────────────────────────────┘
            │
            ▼
    Single Database
```

### How Monolithic Scales

When traffic increases, you **copy the entire server** — even the parts that don't need scaling.

```
                        LOAD BALANCER
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Full Server 1  │ │   Full Server 2  │ │   Full Server 3  │
│                  │ │                  │ │                  │
│ Auth             │ │ Auth             │ │ Auth             │
│ Products    ◄──  │ │ Products    ◄──  │ │ Products    ◄──  │
│ Orders      ◄──  │ │ Orders      ◄──  │ │ Orders      ◄──  │
│ Payments         │ │ Payments         │ │ Payments         │
│ Notifications    │ │ Notifications    │ │ Notifications    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                     Single Database
```

> Orders is getting heavy traffic — but you had to copy Auth, Payments, Notifications too.
> Wasteful — but simple to manage.

### Pros and Cons

| Pros | Cons |
|---|---|
| Simple to develop | One crash = everything down |
| Easy to deploy | Scale entire app even for one feature |
| Easy to debug | Hard to maintain as codebase grows |
| Perfect for small teams | One team's bad code affects everyone |

---

## 2. Microservices Architecture

### What is it?

Every feature is its **own independent service** — own codebase, own server, own database, own deployment.

```
project/
├── auth-service/          → runs on :3001, own MongoDB
├── product-service/       → runs on :3002, own MongoDB
├── order-service/         → runs on :3003, own MongoDB
├── notification-service/  → runs on :3004, own MongoDB
└── api-gateway/           → runs on :3000, entry point
```

### How it runs

```
                        User Request
                             │
                             ▼
                      ┌─────────────┐
                      │ API Gateway │  ← Auth check, route traffic
                      └─────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Service │    │Order Service │    │Product Svc   │
│              │    │              │    │              │
│  Own DB      │    │  Own DB      │    │  Own DB      │
└──────────────┘    └──────────────┘    └──────────────┘
```

### How Microservices Scale

Only the service under load gets scaled — everything else stays the same.

```
                        LOAD BALANCER
                             │
                             ▼
                      ┌─────────────┐
                      │ API Gateway │
                      └─────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Service │    │Order Service │    │Product Svc   │
│   x1 server  │    │   x1 server  │    │   x1 server  │
└──────────────┘    └──────────────┘    └──────────────┘
                             │
                    Heavy traffic on Orders ↓
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
           ┌──────────────┐  ┌──────────────┐
           │Order Service │  │Order Service │  ← only orders scaled
           │  instance 1  │  │  instance 2  │
           └──────────────┘  └──────────────┘
```

> Only Order Service scaled — Auth and Product untouched. Efficient.

### Pros and Cons

| Pros | Cons |
|---|---|
| Scale only what needs scaling | Complex to manage |
| One service down, rest work | Hard to debug across services |
| Different teams own different services | Data consistency challenges |
| Can use different tech per service | More infrastructure needed |

---

## 3. Sync vs Async in Microservices

### Synchronous Communication

Service A sends a request and **waits** for Service B to respond before moving on. Uses HTTP/REST calls.

```
Order Service              Product Service
      │                          │
      │ ──── HTTP Request ──────► │
      │                           │  processing...
      │                           │  processing...
      │ ◄─── Response ─────────── │
      │                           │
   continues                      │
```

**Code:**
```js
// Order Service — waits for Product Service
const product = await axios.get('http://product-service/123')
const order = await Order.create({ product })
// only moves forward after product data arrives
```

**Problem with Sync:**
```
Order Service → Product Service → Inventory Service → Pricing Service
    wait...          wait...           wait...
    
If any one service is down → entire chain fails ❌
Total response time = sum of all service times ❌
```

---

### Asynchronous Communication

Service A **publishes an event** to a message queue and moves on immediately. Service B picks it up in its own time. Uses RabbitMQ / Kafka.

```
Order Service         Message Queue        Notification Service
      │                    │                       │
      │ ── publish event ──►│                       │
      │  moved on already   │                       │
      │                     │──── deliver event ───►│
      │                     │              processes in own time
```

**Code:**
```js
// Order Service — does NOT wait
await Order.create({ productId: 123 })
await queue.publish('order.created', { orderId: 456 })
// immediately moves on ✓

// Notification Service — completely separate server
queue.subscribe('order.created', async (event) => {
  await sendNotification(event.orderId)  // handles in own time
})
```

**Advantage:**
```
Order Service publishes event → moves on immediately ✓
Notification Service down?   → event stays in queue, processed when it recovers ✓
Email Service slow?          → does not slow down Order Service ✓
```

---

### When to use Sync vs Async

| Use Sync When | Use Async When |
|---|---|
| User needs response immediately | Background tasks |
| Login / Auth check | Send email after order |
| Payment confirmation | Update inventory |
| Fetching data to display | Push notifications |
| Example: `GET /products` | Example: order placed → notify vendor |

---

### Real Example — VendorBridge

```
SYNC:
User Login ──► Auth Service ──► JWT returned immediately
(user is waiting on screen — must be sync)

ASYNC:
RFQ Submitted ──► Event Queue
                      ├──► Notification Service → notify vendor
                      ├──► Email Service → send email
                      └──► Audit Service → log activity
(user does not wait — all happens in background)
```

---

## 4. Distributed Systems

### What is it?

A system where **one task is handled by multiple machines working together** — across different locations, different servers — but the user feels like they are talking to one system.

> Note: Distributed is NOT the same as Microservices.
> Microservices = split by feature. Distributed = split by machines/locations.

### Database in Distributed Systems

This is the key difference from Microservices — in a **Shared Database Distributed System**, all services use **one common database** but the application logic runs on multiple machines.

```
┌─────────────────────────────────────────────────────┐
│                    Distributed System                │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Auth Service │  │Order Service │  │Product Svc│ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│          │                │                │        │
│          └────────────────┼────────────────┘        │
│                           ▼                         │
│                  ┌─────────────────┐                │
│                  │  Common Database│                │
│                  │   (Shared)      │                │
│                  └─────────────────┘                │
└─────────────────────────────────────────────────────┘
```

### How Database is Actually Distributed

The shared database itself runs across multiple machines:

**Replication — same data everywhere:**
```
DB Primary (Mumbai)    ← writes happen here
       │
       ├──► DB Replica 1 (Delhi)    ← reads from here
       └──► DB Replica 2 (Chennai)  ← reads from here

One goes down → others serve the data ✓
```

**Sharding — data split across machines:**
```
Users A–M  ──► DB Server 1
Users N–Z  ──► DB Server 2

Load distributed — no single server overloaded ✓
```

### Pros and Cons

| Pros | Cons |
|---|---|
| No data sync problem (shared DB) | Shared DB = single point of failure |
| Simpler than full microservices | DB overload affects all services |
| Good for medium scale | Harder to scale individual data needs |

---

## 5. When to Use What

```
Project Size?
      │
      ▼
   Small / Hackathon / Solo
      │
      └──► MONOLITHIC ✓
           Simple, fast to build, easy to debug
           Example: VendorBridge hackathon build


   Medium / Growing Team
      │
      └──► DISTRIBUTED (Shared DB) ✓
           Services split, but one database
           Easier than full microservices
           Example: Early stage startups


   Large / Multiple Teams / High Traffic
      │
      └──► MICROSERVICES ✓
           Every service independent
           Scale only what needs scaling
           Example: Netflix, Amazon, Uber
```

### Decision Table

| Factor | Monolithic | Distributed | Microservices |
|---|---|---|---|
| Team size | 1–3 devs | 3–10 devs | 10+ devs |
| Timeline | Hackathon / MVP | Growing product | Mature product |
| Traffic | Low–Medium | Medium–High | Very High |
| Database | Single | Shared common | Each service owns its DB |
| Complexity | Low | Medium | High |
| Deploy | One command | Multiple services | CI/CD per service |
| Debug | Easy | Medium | Hard |
| Cost | Low | Medium | High |

### Real World Examples

| Company | Architecture | Why |
|---|---|---|
| Early Netflix | Monolithic | Small team, fast shipping |
| Netflix today | Microservices | 500+ services, global scale |
| Most startups | Monolithic → Distributed | Start simple, grow later |
| Amazon | Microservices | Every team owns a service |

---

## Summary

> **Monolithic** — Everything in one place. Start here. Simple and fast.

> **Distributed** — Services split across machines, but one shared database. Middle ground.

> **Microservices** — Every service fully independent with its own database. Maximum scale.

> **Sync** — Wait for response. Use when user needs data immediately.

> **Async** — Publish and move on. Use for background tasks via message queues.

---

*Start monolithic. Scale when you need to. Do not over-engineer early.*