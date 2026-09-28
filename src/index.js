const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recall - Support that remembers</title>

<style>
:root {
  --bg: #F0F4F8;
  --card: #FFFFFF;
  --line: #DCE3EB;
  --text: #172B4D;
  --muted: #64748B;
  --gold: #2563EB;
  --gold-soft: #E8F1FF;
  --slate: #2563EB;
  --slate-soft: #DCEBFF;
  --err: #B3432B;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font: 15px/1.5 -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, sans-serif;
}

.brand {
  font-family: Georgia, serif;
  font-weight: 400;
}

button {
  font: inherit;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font: inherit;
  background: #FAFCFF;
  color: var(--text);
}

input:focus {
  outline: 2px solid var(--gold);
  outline-offset: 1px;
}

.primary {
  width: 100%;
  padding: 11px;
  border: 0;
  border-radius: 6px;
  background: var(--slate);
  color: #FFFFFF;
  transition: background 0.2s;
}

.primary:hover { background: #1D4ED8; }

.primary:disabled {
  opacity: 0.6;
  cursor: default;
}

/* LOGIN */

#login {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 520px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
}

.card h1 {
  font-size: 28px;
  margin: 0 0 4px;
}

.tag {
  color: var(--muted);
  margin: 0 0 22px;
  font-size: 14px;
}

label {
  display: block;
  font-size: 13px;
  color: var(--muted);
  margin: 0 0 5px;
}

.field { margin-bottom: 14px; }

.err {
  display: none;
  background: #FBEAE5;
  color: var(--err);
  border-radius: 6px;
  padding: 9px 12px;
  font-size: 13px;
  margin-bottom: 14px;
}

.switch {
  text-align: center;
  margin-top: 14px;
  font-size: 13px;
  color: var(--muted);
}

.switch a {
  color: var(--gold);
  cursor: pointer;
  font-weight: 600;
}

.switch a:hover { text-decoration: underline; }

/* DEMO ACCOUNTS */

.demo {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.demo h2 {
  font-size: 13px;
  margin: 0 0 2px;
}

.demo p {
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 10px;
}

.acct {
  display: block;
  width: 100%;
  text-align: left;
  background: #FAFCFF;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 8px;
  transition: 0.2s;
}

.acct:hover {
  border-color: var(--gold);
  background: var(--gold-soft);
}

.acct b {
  display: block;
  font-size: 13px;
}

.acct span {
  font-size: 12px;
  color: var(--muted);
}

/* CHAT LAYOUT */

#chat {
  display: none;
  height: 100%;
  grid-template-columns: 1fr 300px;
}

.main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  background: #F0F4F8;
}

/* HEADER */

header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: #FFFFFF;
}

header .who {
  flex: 1;
  font-size: 13px;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

header .who b { color: var(--text); }

/* HEADER BUTTONS */

.ghost {
  background: #FFFFFF;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 13px;
  color: #2563EB;
  transition: background 0.2s, border-color 0.2s;
}

.ghost:hover {
  background: #EFF6FF;
  border-color: #93C5FD;
}

#memBtn { display: none; }

/* CHAT MESSAGES */

#messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}

.msg {
  max-width: 82%;
  padding: 10px 14px;
  border-radius: 14px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  line-height: 1.55;
}

/* USER MESSAGE */

.msg.user {
  align-self: flex-end;
  background: #DCEBFF;
  color: #173B73;
  border: 1px solid #C8DEFF;
  border-bottom-right-radius: 4px;
}

/* ASSISTANT MESSAGE */

.msg.agent {
  align-self: flex-start;
  background: #E8F1FF;
  color: #173B73;
  border: 1px solid #D5E5FF;
  border-bottom-left-radius: 4px;
}

/* SYSTEM NOTE */

.msg.note {
  align-self: center;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
  max-width: 90%;
}

/* WAITING MESSAGE */

.msg.wait {
  align-self: flex-start;
  background: transparent;
  color: #64748B;
  font-style: italic;
  padding: 4px 14px;
}

/* SUGGESTED PROMPTS */

#chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 10px;
}

.chip {
  background: #FFFFFF;
  border: 1px solid #BFDBFE;
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  color: #2563EB;
  transition: background 0.2s, border-color 0.2s;
}

.chip:hover {
  background: #EFF6FF;
  border-color: #2563EB;
}

/* MESSAGE INPUT AREA */

#form {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-top: 1px solid #E2E8F0;
  background: #F8FAFC;
}

#form input {
  flex: 1;
  min-width: 0;
  width: auto;
  padding: 12px 18px;
  border: 1px solid #DCE3EB;
  border-radius: 24px;
  background: #FFFFFF;
  color: #172B4D;
  font-size: 14px;
  outline: none;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
}

#form input:focus {
  border-color: #60A5FA;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.10);
}

#form input::placeholder { color: #94A3B8; }

/* SEND BUTTON */

#send {
  flex-shrink: 0;
  width: auto;
  min-width: 76px;
  padding: 11px 20px;
  border: none;
  border-radius: 24px;
  background: #2563EB;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

#send:hover { background: #1D4ED8; }
#send:active { transform: scale(0.97); }

#send:disabled {
  background: #93B4F5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* MEMORY SIDEBAR */

aside {
  border-left: 1px solid var(--line);
  background: #F8FAFC;
  padding: 18px;
  overflow-y: auto;
  height: 100%;
}

aside h2 {
  font-size: 15px;
  margin: 0;
}

aside .sub {
  font-size: 12px;
  color: var(--muted);
  margin: 2px 0 12px;
}

#facts {
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
}

#facts li {
  font-size: 13px;
  padding: 8px 10px;
  margin-bottom: 6px;
  background: #FFFFFF;
  border: 1px solid var(--line);
  border-left: 3px solid #3B82F6;
  border-radius: 6px;
}

#facts li.empty {
  border-left-color: var(--line);
  color: var(--muted);
}

/* MOBILE RESPONSIVENESS */

@media (max-width: 820px) {
  #chat { grid-template-columns: 1fr; }

  aside {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 5;
    background: #F8FAFC;
  }

  aside.show { display: block; }
  #memBtn { display: block; }
}

@media (max-width: 480px) {
  .card { padding: 24px 20px; max-width:420px;}
  header { padding: 12px; }
  #messages { padding: 14px; }
  .msg { max-width: 90%; }
  #chips { padding: 0 12px 10px; }

  #form {
    padding: 10px;
    gap: 8px;
  }

  #form input {
    padding: 11px 15px;
    font-size: 14px;
  }

  #send {
    min-width: 65px;
    padding: 10px 14px;
  }
}
</style>
</head>

<body>

<!-- LOGIN PAGE -->

<div id="login">
  <div class="card">
  <h1 class="brand">Customer Support Agent</h1>
    <h1 class="brand">Recall</h1>
    <p class="tag">Support that remembers what happened last time.</p>

    <div class="err" id="err"></div>

    <form id="authForm">
      <div class="field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          required
          autocomplete="username"
        >
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          required
          autocomplete="current-password"
        >
      </div>

      <button class="primary" type="submit" id="authBtn">
        Log in
      </button>
    </form>

    <div class="switch">
      <span id="swText">New here?</span>
      <a id="swLink">Create an account</a>
    </div>

    <!-- DEMO ACCOUNTS -->

    <div class="demo">
      <h2>Try a demo account</h2>

      <p>
        Password for all: demo12345. Click one to fill it in.
        Each has past tickets saved in Hindsight memory.
      </p>

      <button
        type="button"
        class="acct"
        data-e="muqsith@leader.com"
      >
        <b>muqsith@leader.com</b>
        <span>
          <strong>Password for all: demo12345</strong>
          Printer Wi-Fi (twice), plan upgrade,
          duplicate billing charge
        </span>
      </button>

      <button
        type="button"
        class="acct"
        data-e="rizawan@example.com"
      >
        <b>rizawan@example.com</b>
        <span>
        <strong>Password for all: demo12345</strong>
          Login failure, data export,
          Android app crash still open
        </span>
      </button>

      <button
        type="button"
        class="acct"
        data-e="Naafi@example.com"
      >
        <b>Naafi@example.com</b>
        <span>
        <strong>Password for all: demo12345</strong>
          CRM API integration, duplicate emails,
          plan comparison, API v2 break
        </span>
      </button>

      <p style="margin:8px 0 0">
        New accounts start with an empty memory and learn as you chat.
      </p>
    </div>
  </div>
</div>

<!-- CHAT PAGE -->

<div id="chat">
  <div class="main">
    <header>
      <div class="who">
        Signed in as <b id="me"></b>
      </div>

      <button class="ghost" id="memBtn">
        Memory
      </button>

      <button class="ghost" id="out">
        Log out
      </button>
    </header>

    <div id="messages"></div>
    <div id="chips"></div>

    <form id="form">
      <input
        id="input"
        placeholder="Describe your issue..."
        autocomplete="off"
        required
      >

      <button
        class="primary"
        id="send"
        type="submit"
      >
        Send
      </button>
    </form>
  </div>

  <!-- MEMORY SIDEBAR -->

  <aside id="mem">
    <button
      class="ghost"
      id="memClose"
      style="float:right;display:none"
    >
      Close
    </button>

    <h2 class="brand">What I remember</h2>

    <p class="sub">
      Live from Hindsight memory
    </p>

    <ul id="facts"></ul>

    <button class="ghost" id="refresh">
      Refresh
    </button>
  </aside>
</div>

<script>
var $ = function(i) {
  return document.getElementById(i);
};

var mode = "login";
var session = null;

/*
  IMPORTANT:
  Use chatHistory instead of history.
  The browser already has a built-in window.history object.
*/
var chatHistory = [];

var busy = false;

var CHIPS = [
  "Any update on my issue?",
  "What issues have I had before?",
  "It is still not working"
];

function clean(t) {
  t = String(t || "")
    .split("**").join("")
    .split("__").join("")
    .split("\`").join("");

  return t.replace(/^#+ /gm, "").trim();
}

function showErr(m) {
  $("err").textContent = m;
  $("err").style.display = "block";
}

function setMode(m) {
  mode = m;

  $("authBtn").textContent =
    m === "login" ? "Log in" : "Create account";

  $("swText").textContent =
    m === "login" ? "New here?" : "Already have an account?";

  $("swLink").textContent =
    m === "login" ? "Create an account" : "Log in";

  $("err").style.display = "none";
}

$("swLink").onclick = function() {
  setMode(mode === "login" ? "signup" : "login");
};

/* DEMO ACCOUNT SELECTION */

document.querySelectorAll(".acct").forEach(function(b) {
  b.onclick = function() {
    setMode("login");
    $("email").value = b.dataset.e;
    $("password").value = "demo12345";
  };
});

/* LOGIN AND SIGNUP */

$("authForm").onsubmit = function(e) {
  e.preventDefault();

  $("err").style.display = "none";
  $("authBtn").disabled = true;

  var label = $("authBtn").textContent;
  $("authBtn").textContent = "Please wait...";

  var email = $("email").value.trim();

  fetch(mode === "login" ? "/login" : "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: $("password").value
    })
  })
  .then(function(r) {
    if (!r.ok) {
      return r.json().then(function(d) {
        throw new Error(d.error || "Authentication failed.");
      });
    }
    return r.json();
  })
  .then(function(d) {
    if (!d.success) {
      showErr(d.error || "Something went wrong.");
      return;
    }

    session = {
      user_id: d.user_id,
      email: email
    };

    sessionStorage.setItem(
      "recall_session",
      JSON.stringify(session)
    );

    enter();
  })
  .catch(function(error) {
    console.error("Authentication failed:", error);
    showErr(error.message || "Could not reach the server.");
  })
  .finally(function() {
    $("authBtn").disabled = false;
    $("authBtn").textContent = label;
  });
};

/* ENTER CHAT */

function enter() {
  $("login").style.display = "none";
  $("chat").style.display = "grid";

  $("me").textContent = session.email;

  $("messages").innerHTML = "";

  // Reset this user's in-memory conversation history.
  chatHistory = [];

  note(
    "Your past tickets are remembered. Try asking something vague like 'any update on my issue?'"
  );

  $("chips").innerHTML = "";

  CHIPS.forEach(function(c) {
    var b = document.createElement("button");

    b.type = "button";
    b.className = "chip";
    b.textContent = c;

    b.onclick = function() {
      send(c);
    };

    $("chips").appendChild(b);
  });

  loadMemory();
  $("input").focus();
}

/* LOGOUT */

$("out").onclick = function() {
  sessionStorage.removeItem("recall_session");
  session = null;

  chatHistory = [];
  busy = false;

  $("chat").style.display = "none";
  $("login").style.display = "flex";
  $("authForm").reset();
};

/* ADD MESSAGE */

function add(text, cls) {
  var d = document.createElement("div");

  d.className = "msg " + cls;
  d.textContent = text;

  $("messages").appendChild(d);
  $("messages").scrollTop = $("messages").scrollHeight;

  return d;
}

function note(t) {
  add(t, "note");
}

/* SEND CHAT MESSAGE */

function send(text) {
  if (busy || !text || !session) return;

  busy = true;
  var replyDisplayed = false;

  $("send").disabled = true;
  $("chips").innerHTML = "";

  add(text, "user");
  $("input").value = "";

  var w = add("Recalling your history...", "wait");

  /*
    Send the previous conversation messages to the server.
    The current message is sent separately as "message".
  */
  var historyToSend = chatHistory.slice(-8);

  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: session.user_id,
      message: text,

      // Keep the API field named "history".
      // Its value comes from our JavaScript chatHistory array.
      history: historyToSend
    })
  })
  .then(function(r) {
    if (!r.ok) {
      return r.json().then(function(d) {
        throw new Error(
          d.error || "Chat request failed with HTTP " + r.status
        );
      });
    }

    return r.json();
  })
  .then(function(d) {
    w.remove();

    if (d.reply) {
      var r = clean(d.reply);

      // Display the assistant's response.
      add(r, "agent");
      replyDisplayed = true;

      /*
        Store both messages in chatHistory.
        This is deliberately not named "history", to avoid
        conflicting with the browser's built-in window.history.
      */
      chatHistory.push(
        {
          role: "user",
          content: text
        },
        {
          role: "assistant",
          content: r
        }
      );

      // Keep only the most recent 8 messages in memory.
      chatHistory = chatHistory.slice(-8);

      // Refresh Hindsight memory after the response.
      setTimeout(loadMemory, 7000);
    } else {
      add(
        d.error || "Something went wrong. Please try again.",
        "agent"
      );
    }
  })
  .catch(function(error) {
    console.error("Chat request failed:", error);

    w.remove();

    /*
      Show the generic connection message only if a reply
      has not already been displayed.
    */
    if (!replyDisplayed) {
      add(
        error.message === "Failed to fetch"
          ? "Could not reach the server. Please try again."
          : (error.message || "Something went wrong. Please try again."),
        "agent"
      );
    }
  })
  .finally(function() {
    busy = false;
    $("send").disabled = false;
    $("input").focus();
  });
}

/* CHAT FORM */

$("form").onsubmit = function(e) {
  e.preventDefault();
  send($("input").value.trim());
};

/* LOAD HINDSIGHT MEMORY */

function loadMemory() {
  if (!session) return;

  fetch("/memory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: session.user_id
    })
  })
  .then(function(r) {
    if (!r.ok) {
      throw new Error("Memory request failed: HTTP " + r.status);
    }
    return r.json();
  })
  .then(function(d) {
    var ul = $("facts");
    ul.innerHTML = "";

    var f = d.facts || [];

    if (!f.length) {
      var li = document.createElement("li");

      li.className = "empty";
      li.textContent =
        "Nothing yet. Start chatting and this fills up.";

      ul.appendChild(li);
      return;
    }

    f.forEach(function(t) {
      var li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
  })
  .catch(function(error) {
    console.error("Memory loading failed:", error);
  });
}

/* MEMORY CONTROLS */

$("refresh").onclick = loadMemory;

$("memBtn").onclick = function() {
  $("mem").classList.add("show");
  $("memClose").style.display = "block";
};

$("memClose").onclick = function() {
  $("mem").classList.remove("show");
};

/* RESTORE SESSION */

try {
  var s = sessionStorage.getItem("recall_session");

  if (s) {
    session = JSON.parse(s);
    enter();
  }
} catch(e) {
  console.error("Could not restore session:", e);
}
</script>

</body>
</html>`;

const HS = "https://api.hindsight.vectorize.io";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });

async function hashPassword(password) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const hsHeaders = (env) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${env.HINDSIGHT_API_KEY}`
});

async function recall(env, bankId, query) {
  try {
    const r = await fetch(
      `${HS}/v1/default/banks/${bankId}/memories/recall`,
      {
        method: "POST",
        headers: hsHeaders(env),
        body: JSON.stringify({ query })
      }
    );

    if (!r.ok) return [];

    const d = await r.json();

    return (d.results || [])
      .map(x => x.text)
      .filter(Boolean);
  } catch (e) {
    console.log("recall failed:", String(e));
    return [];
  }
}

async function retain(env, bankId, content) {
  try {
    const r = await fetch(
      `${HS}/v1/default/banks/${bankId}/memories`,
      {
        method: "POST",
        headers: hsHeaders(env),
        body: JSON.stringify({
          items: [{ content }]
        })
      }
    );

    if (!r.ok) {
      console.log("retain failed:", r.status, await r.text());
    }
  } catch (e) {
    console.log("retain failed:", String(e));
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    /* SERVE THE FRONTEND */

    if (url.pathname === "/" && request.method === "GET") {
      return new Response(HTML_PAGE, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request" }, 400);
    }

    /* SIGNUP */

    if (url.pathname === "/signup") {
      const { email, password } = body;

      if (!email || !password) {
        return json(
          { error: "Email and password required" },
          400
        );
      }

      const existing = await env.support_agent_db
        .prepare("SELECT id FROM users WHERE email = ?")
        .bind(email)
        .first();

      if (existing) {
        return json(
          { error: "User already exists" },
          400
        );
      }

      const id = crypto.randomUUID();

      await env.support_agent_db
        .prepare(
          "INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)"
        )
        .bind(
          id,
          email,
          await hashPassword(password)
        )
        .run();

      return json({
        success: true,
        user_id: id
      });
    }

    /* LOGIN */

    if (url.pathname === "/login") {
      const { email, password } = body;

      const user = await env.support_agent_db
        .prepare(
          "SELECT id, password_hash FROM users WHERE email = ?"
        )
        .bind(email)
        .first();

      if (
        !user ||
        user.password_hash !== await hashPassword(password || "")
      ) {
        return json(
          { error: "Invalid email or password" },
          401
        );
      }

      return json({
        success: true,
        user_id: user.id
      });
    }

    /* LOAD HINDSIGHT MEMORY */

    if (url.pathname === "/memory") {
      if (!body.user_id) {
        return json(
          { error: "user_id required" },
          400
        );
      }

      const facts = await recall(
        env,
        body.user_id,
        "past support issues, resolutions, environment and preferences"
      );

      return json({
        facts: [...new Set(facts)].slice(0, 12)
      });
    }

    /* CHAT */

    if (url.pathname === "/chat") {
      const { user_id, message } = body;

      if (!user_id || !message) {
        return json(
          { error: "user_id and message required" },
          400
        );
      }

      /*
        Validate and limit conversation history received from
        the frontend. The API property remains "history".
      */
      const history = (
        Array.isArray(body.history) ? body.history : []
      )
        .filter(
          m =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .slice(-8)
        .map(m => ({
          role: m.role,
          content: m.content.slice(0, 1500)
        }));

      /* RETRIEVE CUSTOMER MEMORY */

      const facts = await recall(
        env,
        user_id,
        message
      );

      const memory = facts.length
        ? facts.map(f => "- " + f).join("\n")
        : "No previous history for this customer yet.";

      /* SYSTEM INSTRUCTIONS */

      const system = `You are a friendly support agent for a software company. You remember this customer's past tickets, listed below.

CUSTOMER MEMORY:
${memory}

Rules:
- Reply in plain text only. No markdown, no tables, no asterisks, no emojis.
- Keep it short: 2 to 5 sentences or medium when need more clarity. If steps are needed, put each on its own line as "1.", "2.", and so on.
- If the message relates to a past issue in memory, briefly say what happened and how it was handled, then ask whether it is now resolved or still happening.
- If memory shows the customer was frustrated, acknowledge it in one short sentence and get to the point.
- If there is no relevant memory, ask one clarifying question about their device, software version, or plan.
- Never invent ticket details that are not in memory.`;

      /* GROQ REQUEST */

      let groqRes;

      try {
        groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
              model: "openai/gpt-oss-120b",
              messages: [
                { role: "system", content: system },
                ...history,
                { role: "user", content: message }
              ]
            })
          }
        );
      } catch (e) {
        console.log("Groq request failed:", String(e));

        return json(
          {
            error: "Could not connect to the assistant. Please try again."
          },
          502
        );
      }

      const data = await groqRes.json().catch(() => ({}));

      if (groqRes.status === 429) {
        return json(
          {
            error: "The assistant is a little busy. Please try again in a few seconds."
          },
          429
        );
      }

      const reply =
        data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        console.log(
          "Groq error:",
          groqRes.status,
          JSON.stringify(data)
        );

        return json(
          {
            error: "The assistant could not respond. Please try again."
          },
          502
        );
      }

      /* SAVE THE CONVERSATION TO HINDSIGHT */

      ctx.waitUntil(
        retain(
          env,
          user_id,
          `Customer message: ${message}\nSupport reply summary: ${reply.slice(0, 300)}`
        )
      );

      return json({ reply });
    }

    return new Response("Not found", { status: 404 });
  }
};