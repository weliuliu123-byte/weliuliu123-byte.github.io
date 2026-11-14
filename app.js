(() => {
  "use strict";

  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Interactive Thread-Scaling Benchmark Switcher
  const BENCHMARK_MODES = {
    single_copy: {
      time: "14.80 s",
      timePct: 100,
      throughput: "67.5 MB/s",
      throughputPct: 14,
      speedup: "1.00x",
      speedupPct: 14,
      memory: "1,420 MB",
      memoryPct: 100,
      leak: "Manual Cleanup",
      note: "Baseline single-threaded parser allocates new std::string objects per log line, causing heavy heap pressure."
    },
    single_view: {
      time: "7.45 s",
      timePct: 50,
      throughput: "134.2 MB/s",
      throughputPct: 28,
      speedup: "1.99x",
      speedupPct: 28,
      memory: "390 MB",
      memoryPct: 27,
      leak: "0 B Leaked",
      note: "Replacing string copies with zero-copy std::string_view halves runtime and cuts peak RSS by >70%."
    },
    threads_4: {
      time: "3.60 s",
      timePct: 24,
      throughput: "277.8 MB/s",
      throughputPct: 58,
      speedup: "4.11x",
      speedupPct: 58,
      memory: "305 MB",
      memoryPct: 21,
      leak: "0 B Leaked",
      note: "4-thread newline-aligned chunking processes independent byte partitions with thread-local stat maps."
    },
    threads_8: {
      time: "2.10 s",
      timePct: 14,
      throughput: "476.2 MB/s",
      throughputPct: 100,
      speedup: "7.05x",
      speedupPct: 100,
      memory: "310 MB",
      memoryPct: 22,
      leak: "0 B Leaked",
      note: "Zero-copy tokenization + thread-local aggregation eliminates allocator lock contention across 8 worker threads."
    }
  };

  const benchTabs = document.querySelectorAll(".bench-tab");
  const valTime = document.getElementById("val-time");
  const barTime = document.getElementById("bar-time");
  const valThroughput = document.getElementById("val-throughput");
  const barThroughput = document.getElementById("bar-throughput");
  const valSpeedup = document.getElementById("val-speedup");
  const barSpeedup = document.getElementById("bar-speedup");
  const valMemory = document.getElementById("val-memory");
  const barMemory = document.getElementById("bar-memory");
  const leakStatus = document.getElementById("bench-leak-status");
  const benchNote = document.getElementById("bench-note");

  function setBenchmarkMode(modeKey) {
    const data = BENCHMARK_MODES[modeKey];
    if (!data) return;

    benchTabs.forEach((tab) => {
      const active = tab.dataset.mode === modeKey;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });

    if (valTime) valTime.textContent = data.time;
    if (barTime) barTime.style.width = `${data.timePct}%`;
    if (valThroughput) valThroughput.textContent = data.throughput;
    if (barThroughput) barThroughput.style.width = `${data.throughputPct}%`;
    if (valSpeedup) valSpeedup.textContent = data.speedup;
    if (barSpeedup) barSpeedup.style.width = `${data.speedupPct}%`;
    if (valMemory) valMemory.textContent = data.memory;
    if (barMemory) barMemory.style.width = `${data.memoryPct}%`;
    if (leakStatus) leakStatus.textContent = data.leak;
    if (benchNote) benchNote.textContent = data.note;
  }

  benchTabs.forEach((tab) => {
    tab.addEventListener("click", () => setBenchmarkMode(tab.dataset.mode));
  });

  // 3. Interactive Engineering Terminal
  const terminalOutput = document.getElementById("terminal-output");
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalClear = document.getElementById("terminal-clear");
  const terminalChips = document.querySelectorAll(".chip[data-cmd]");

  const TERMINAL_RESPONSES = {
    help: [
      "Available commands:",
      "  whoami                 - Display engineer profile & academic info",
      "  skills                 - List C++, Systems, and IC Design core competencies",
      "  projects               - Summarize featured projects",
      "  benchmark --threads 8  - Print 8-thread simulation log analyzer telemetry",
      "  contact                - Show direct contact details",
      "  clear                  - Clear terminal buffer"
    ].join("\n"),
    whoami: [
      "Name       : Ha Gia Bao",
      "Role       : C++ Software Engineer Intern | IC Design Student",
      "University : FPT University (2024 - Present)",
      "Major      : IC Design (GPA: 7.8 / 10)",
      "Location   : Ho Chi Minh City, Vietnam",
      "Languages  : Vietnamese (Native), English (Professional)"
    ].join("\n"),
    skills: [
      "[Systems & C++]   Modern C/C++ (OOP, STL, Smart Pointers), Memory Management",
      "[Concurrency]     Multithreading, OS Concepts, Chunk Partitioning",
      "[Algorithms]      Trees, Graphs, Hashmaps, Sorting Optimization",
      "[IC & EDA]        IC Design Fundamentals, Large-Scale Simulation Log Processing"
    ].join("\n"),
    projects: [
      "1) High-Performance Data Processing Tool (2025 - Present | FPT University)",
      "   - Parses & analyzes large hardware simulation logs in Modern C++ & STL",
      "   - Multithreaded chunk processing + strict smart-pointer memory safety",
      "2) Algorithms & Data Structures Optimization (2024 - 2025 | Coursework)",
      "   - Optimized Trees, Graphs, Hashmaps, and Sorting for complex data parsing"
    ].join("\n"),
    "benchmark --threads 8": [
      "[sim_log_analyzer] Input      : 1.0 GB Hardware Sim Log (10M+ lines)",
      "[sim_log_analyzer] Workers    : 8 threads (C++17 zero-copy std::string_view)",
      "[sim_log_analyzer] Elapsed    : 2.10 s | Throughput: 476.2 MB/s | Speedup: 7.05x",
      "[sim_log_analyzer] Memory     : Peak RSS 310 MB | 0 bytes leaked (RAII / Smart Pointers)"
    ].join("\n"),
    contact: [
      "Email   : weliuliu132@gmail.com",
      "Phone   : +84 344 482 490",
      "City    : Ho Chi Minh City, Vietnam",
      "Resume  : ./Ha_Gia_Bao_Resume.pdf"
    ].join("\n")
  };

  function appendTerminalEntry(command, responseText) {
    if (!terminalOutput) return;

    const cmdLine = document.createElement("div");
    cmdLine.className = "term-cmd-line";
    cmdLine.textContent = `bao@fpt-ic-lab:~$ ${command}`;
    terminalOutput.appendChild(cmdLine);

    if (responseText) {
      const respLine = document.createElement("div");
      respLine.textContent = responseText;
      terminalOutput.appendChild(respLine);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function runTerminalCommand(rawCommand) {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    const normalized = cmd.toLowerCase();
    if (normalized === "clear") {
      if (terminalOutput) terminalOutput.innerHTML = "";
      return;
    }

    if (normalized.startsWith("benchmark")) {
      appendTerminalEntry(cmd, TERMINAL_RESPONSES["benchmark --threads 8"]);
      return;
    }

    const reply = TERMINAL_RESPONSES[normalized];
    if (reply) {
      appendTerminalEntry(cmd, reply);
    } else {
      appendTerminalEntry(
        cmd,
        `Command not found: '${cmd}'. Type 'help' to see supported commands.`
      );
    }
  }

  if (terminalOutput) {
    appendTerminalEntry("whoami", TERMINAL_RESPONSES.whoami);
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runTerminalCommand(terminalInput.value);
      terminalInput.value = "";
    });
  }

  terminalChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      runTerminalCommand(chip.dataset.cmd || "");
    });
  });

  if (terminalClear) {
    terminalClear.addEventListener("click", () => {
      if (terminalOutput) terminalOutput.innerHTML = "";
    });
  }

  // 4. Resume Preview Modal (<dialog>)
  const resumeModal = document.getElementById("resume-modal");
  const openModalBtn = document.getElementById("open-resume-modal");
  const closeModalBtn = document.getElementById("close-resume-modal");

  if (resumeModal && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener("click", () => {
      if (typeof resumeModal.showModal === "function") {
        resumeModal.showModal();
        closeModalBtn.focus();
      } else {
        window.open("./Ha_Gia_Bao_Resume.pdf", "_blank", "noopener");
      }
    });

    closeModalBtn.addEventListener("click", () => {
      resumeModal.close();
      openModalBtn.focus();
    });

    resumeModal.addEventListener("click", (event) => {
      if (event.target === resumeModal) {
        resumeModal.close();
        openModalBtn.focus();
      }
    });
  }

  // 5. One-Click Email Copy
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = copyEmailBtn.dataset.email || "weliuliu132@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const original = copyEmailBtn.textContent;
        copyEmailBtn.textContent = "Copied!";
        setTimeout(() => {
          copyEmailBtn.textContent = original;
        }, 1800);
      } catch (_err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
