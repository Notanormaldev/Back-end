import React, { useState } from "react";
import { axiosinsta } from "../config/axiosinsta.jsx";
import { useNavigate } from "react-router";

function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addLog = (msg, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ text: `[${timestamp}] ${msg}`, type }, ...prev]);
  };

  const testProtectedApi = async () => {
    setLoading(true);
    addLog("Sending request to protected endpoint: GET /api/home/check...", "info");
    try {
      const res = await axiosinsta.get("/api/home/check");
      addLog(`SUCCESS! Backend Response: ${JSON.stringify(res.data)}`, "success");
    } catch (err) {
      console.error(err);
      addLog(`FAILED! Error: ${err.response?.data?.msg || err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800 text-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-400">Protected Home Dashboard</h1>
        <p className="text-slate-400 text-xs mt-2">
          Access Token: <span className="text-amber-400 font-mono font-bold">15 Seconds</span> | Refresh Token: <span className="text-emerald-400 font-mono font-bold">2 Minutes</span>
        </p>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-slate-200">💡 How to test Interceptors & Token Refresh fast:</p>
        <ol className="list-decimal list-inside space-y-1 text-slate-400">
          <li>Click <strong className="text-indigo-400">"Test Protected API"</strong> immediately after login. (Response will succeed with 200 OK)</li>
          <li>Wait <strong className="text-amber-400">15 seconds</strong> for Access Token to expire.</li>
          <li>Click <strong className="text-indigo-400">"Test Protected API"</strong> again. Watch browser console & logs below: Axios Interceptor catches the 401 error, automatically calls <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">/api/auth/get-act</code> to refresh access token, and retries the original request seamlessly!</li>
          <li>Wait <strong className="text-emerald-400">2 minutes</strong> for Refresh Token to expire and test again. Interceptor will detect total expiration and redirect to login page.</li>
        </ol>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={testProtectedApi}
          disabled={loading}
          className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-semibold text-white text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Testing API..." : "🚀 Test Protected API (/api/home/check)"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-slate-300 text-sm transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-2 flex justify-between items-center">
          <span>Live API Test Logs:</span>
          {logs.length > 0 && (
            <button onClick={() => setLogs([])} className="text-xs text-indigo-400 hover:underline">
              Clear
            </button>
          )}
        </h3>

        <div className="w-full h-48 bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs overflow-y-auto space-y-1.5">
          {logs.length === 0 ? (
            <p className="text-slate-600 italic">Click "Test Protected API" to see live interceptor logs...</p>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.type === "success"
                    ? "text-emerald-400"
                    : log.type === "error"
                    ? "text-red-400"
                    : "text-slate-300"
                }
              >
                {log.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;