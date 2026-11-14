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

  // 2. Semester Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";

      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  // 3. Per-Project Technical Inspector Tabs
  const inspectors = document.querySelectorAll("[data-inspector]");

  inspectors.forEach((inspector) => {
    const tabs = inspector.querySelectorAll(".insp-tab[data-tab]");
    const panes = inspector.querySelectorAll(".insp-pane[data-pane]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });

        panes.forEach((pane) => {
          const isMatch = pane.dataset.pane === target;
          pane.classList.toggle("is-active", isMatch);
          pane.hidden = !isMatch;
        });
      });
    });
  });

  // 4. Interactive Engineering Console
  const terminalOutput = document.getElementById("terminal-output");
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalClear = document.getElementById("terminal-clear");
  const terminalChips = document.querySelectorAll(".chip[data-cmd]");

  const TERMINAL_RESPONSES = {
    help: [
      "Available commands:",
      "  whoami   - Display engineer profile & affiliation",
      "  los201   - Embedded Linux Systems (ARM Cortex-A9 drivers & POSIX daemon)",
      "  cos201   - FPGA SECDED (8,4) + BPSK Pipeline (tx_rx_dsp_top, bit_flip_channel)",
      "  dgt302   - AMD Kria KR260 Median-Sobel Accelerator (window_3x3 & sync)",
      "  skills   - List RTL, Embedded Linux & verification stack",
      "  contact  - Show direct email, GitHub & phone details",
      "  clear    - Clear console output"
    ].join("\n"),
    whoami: [
      "Name       : Ha Gia Bao",
      "Focus      : IC Design, FPGA RTL & Embedded Linux Systems",
      "University : FPT University (2024 - Present) | Major: IC Design",
      "Location   : Ho Chi Minh City, Vietnam",
      "Languages  : Vietnamese (Native), English (Professional)"
    ].join("\n"),
    los201: [
      "[LOS201] Embedded Linux Systems (Sole Author)",
      "  Repo     : https://github.com/weliuliu123-byte/LOS",
      "  Target   : QEMU ARMv7-A Cortex-A9 (vexpress-a9), Linux 6.1.90 LTS, BusyBox 1.35.0",
      "  Drivers  : /dev/lab2 (Major 240), 20/20 extension exercises (sysfs/procfs/atomic_t),",
      "             /dev/asgn1 IOCTL, /dev/counter misc device, 32MB MTD/nandsim JFFS2 flash",
      "  Userspace: 4-thread POSIX real-time sensor daemon (sms_app + /dev/sms_sensor)",
      "  Debug/RT : GDB remote triage, Valgrind (0 leaks), perf & cyclictest"
    ].join("\n"),
    cos201: [
      "[COS201] FPGA SECDED (8,4) + BPSK Communication Pipeline",
      "  Repo     : https://github.com/ntue2719-commits/secDED-bpsk-fpga",
      "  My Scope : tx_rx_dsp_top.v (6-stage pipeline integration) & bit_flip_channel.v (LFSR error injection)",
      "  Verify   : 384 DSP transactions | 24,576 samples | 154,373 checks (0 errors)",
      "             96 UART end-to-end requests | 577 checks (0 errors)",
      "  Vivado   : 50 MHz | 165 LUTs | 213 FFs | WNS +17.949 ns | 0.289 W"
    ].join("\n"),
    dgt302: [
      "[DGT302] Median-Sobel Image Processing Accelerator on AMD Kria KR260",
      "  Repo     : https://github.com/ntue2719-commits/image-dsp-benchmark",
      "  My Scope : window_3x3.v (3x3 shift-register sliding window) & o_valid/o_x/o_y pipeline sync",
      "  Verify   : 512x512 Datapath 516,133 checks (0 err) | AXI regression 24,041 checks (0 err)",
      "  Kria K26 : 100 MHz | 3,560 LUTs | 3,406 Regs | 2 BRAM | WNS +0.322 ns | Timing MET",
      "  Bring-up : Physical KR260 FPGA Manager + Linux /dev/mem mmap() control"
    ].join("\n"),
    skills: [
      "[RTL & FPGA]       Verilog-2001, Streaming Datapaths, Window/Line Buffers, Vivado/XSim STA",
      "[Embedded Linux]   Linux 6.1.90 Kernel Modules, Character Drivers, IOCTL, sysfs/procfs, JFFS2",
      "[Systems & Co-Sim] C / Modern C++, Python Golden Models, POSIX Threads, GDB, Valgrind, perf"
    ].join("\n"),
    contact: [
      "Email   : weliuliu132@gmail.com",
      "Phone   : +84 344 482 490",
      "GitHub  : https://github.com/weliuliu123-byte",
      "Web     : https://weliuliu123-byte.github.io"
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

    const reply = TERMINAL_RESPONSES[normalized];
    if (reply) {
      appendTerminalEntry(cmd, reply);
    } else {
      appendTerminalEntry(
        cmd,
        `Command not found: '${cmd}'. Type 'help' for supported commands.`
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

  // 5. Resume Preview Modal (<dialog>)
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

  // 6. One-Click Email Copy
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
