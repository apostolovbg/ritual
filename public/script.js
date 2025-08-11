/*
  Client side logic for the EDI to JSON converter.
  The code favours readability over micro-optimisation because the page is
  primarily a test harness for backend endpoints.
*/

let currentTab = 'upload'; // Track which tab is active for input retrieval

/**
 * switchTab updates the visible input area based on user selection.
 * Tabs share markup, so toggling classes keeps DOM manipulations minimal.
 */
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-content').forEach(div => {
    div.classList.toggle('hidden', div.id !== `${tab}-content`);
  });
}

/**
 * loadSample pulls an example EDI file from the server so testers have
 * realistic data without manual setup. The content is injected into the
 * textarea and the Text tab is shown so it can be inspected.
 */
async function loadSample(filename) {
  try {
    const res = await fetch(`/sample/${filename}`);
    if (!res.ok) throw new Error('Sample not found');
    const text = await res.text();
    document.getElementById('edi-text').value = text;
    switchTab('text');
  } catch (err) {
    showError(err.message);
  }
}

/**
 * handleResponse prints formatted JSON with syntax highlighting.
 * This function hides the spinner and reveals the copy button once data
 * is ready, reinforcing the feedback loop for the user.
 */
function handleResponse(data) {
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');
  spinner.classList.add('hidden');
  const jsonStr = JSON.stringify(data, null, 2);
  output.innerHTML = syntaxHighlight(jsonStr);
  copyBtn.classList.remove('hidden');
}

/**
 * showError displays a simple message in place of the JSON output.
 * Keeping error handling lightweight avoids distracting from the main
 * conversion flow yet still surfaces issues for debugging.
 */
function showError(msg) {
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');
  spinner.classList.add('hidden');
  copyBtn.classList.add('hidden');
  output.textContent = msg;
}

/**
 * convertEDI gathers the EDI text from the active tab and posts it to the
 * backend. File reading is asynchronous, so the function is declared async.
 */
async function convertEDI() {
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');
  let ediData = '';

  if (currentTab === 'text' || currentTab === 'sample') {
    ediData = document.getElementById('edi-text').value.trim();
  } else if (currentTab === 'upload') {
    const file = document.getElementById('edi-file').files[0];
    if (file) {
      ediData = await file.text();
    }
  }

  if (!ediData) {
    showError('No EDI data provided.');
    return;
  }

  spinner.classList.remove('hidden');
  output.textContent = '';
  copyBtn.classList.add('hidden');

  try {
    const res = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: ediData
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const json = await res.json();
    handleResponse(json);
  } catch (err) {
    showError(err.message);
  }
}

/**
 * copyJSON uses the Clipboard API to place the formatted JSON onto the
 * user's clipboard. The check for the output's text ensures we don't copy
 * empty strings.
 */
function copyJSON() {
  const text = document.getElementById('output').innerText;
  if (text) {
    navigator.clipboard.writeText(text);
  }
}

/**
 * syntaxHighlight wraps JSON tokens in span elements so CSS can colour them.
 * This small helper keeps presentation concerns out of handleResponse.
 */
function syntaxHighlight(json) {
  return json.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'json-key' : 'json-string';
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
}

// --- Event bindings ------------------------------------------------------

document.querySelectorAll('.tab').forEach(btn =>
  btn.addEventListener('click', () => switchTab(btn.dataset.tab))
);

document.querySelectorAll('.sample-btn').forEach(btn =>
  btn.addEventListener('click', () => loadSample(btn.dataset.file))
);

document.getElementById('edi-file').addEventListener('change', () => switchTab('upload'));

document.getElementById('convert-btn').addEventListener('click', convertEDI);

document.getElementById('copy-btn').addEventListener('click', copyJSON);
