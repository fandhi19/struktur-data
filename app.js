// Application Logic for Web Pembelajaran Struktur Data (Kurikulum Merdeka)
// Dikembangkan untuk portofolio UKIN PPG Prajabatan UNY - Ilyas Fandhi Anggara, S.Kom

// --- Sound Synthesizer via Web Audio API (100% Offline, No External Audio Files) ---
const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  play(type) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'push') {
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'success') {
        // High double-chime
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.warn("Audio play prevented:", e);
    }
  }
};

// --- App State Management ---
const AppState = {
  studentName: localStorage.getItem('student_name') || 'Siswa Kelas X',
  studentClass: localStorage.getItem('student_class') || 'Fase E - X-1',
  preTestScore: localStorage.getItem('pretest_score') ? parseInt(localStorage.getItem('pretest_score')) : null,
  postTestScore: localStorage.getItem('posttest_score') ? parseInt(localStorage.getItem('posttest_score')) : null,
  activeTab: 'beranda',
  activeChapterId: 'bab1',

  // List Simulator State
  listData: [
    { val: "Apel", addr: "0x100" },
    { val: "Jeruk", addr: "0x104" },
    { val: "Mangga", addr: "0x108" },
    { val: "Pisang", addr: "0x10C" }
  ],
  baseAddress: 0x100,
  dataSize: 4,

  // Stack Simulator State
  stackData: ["Data A", "Data B", "Data C"],
  maxStackSize: 6,

  // Queue Simulator State
  queueData: ["Pelanggan 1", "Pelanggan 2", "Pelanggan 3"],
  maxQueueSize: 6
};

// --- Main Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStudentProfile();
  initMateriViewer();
  initSimulators();
  initGlossary();
  initPreTest();
  initPostTest();
  initSoundToggle();
  initSpreadsheetManager();
});

// --- Sound Toggle ---
function initSoundToggle() {
  const btn = document.getElementById('soundToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    SoundFX.enabled = !SoundFX.enabled;
    btn.innerHTML = SoundFX.enabled 
      ? '<span class="text-emerald-600">🔊 Suara: ON</span>' 
      : '<span class="text-slate-400">🔇 Suara: OFF</span>';
    if (SoundFX.enabled) SoundFX.play('click');
  });
}

// --- Student Profile Sync ---
function initStudentProfile() {
  const inputName = document.getElementById('heroStudentName');
  const inputClass = document.getElementById('heroStudentClass');
  const startBtn = document.getElementById('btnStartLearning');
  const displayPill = document.getElementById('userProfilePill');

  const updatePill = () => {
    if (displayPill) {
      displayPill.textContent = `${AppState.studentName} (${AppState.studentClass})`;
    }
  };

  updatePill();

  if (startBtn && inputName) {
    if (AppState.studentName !== 'Siswa Kelas X') {
      inputName.value = AppState.studentName;
    }
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      SoundFX.play('click');
      if (inputName.value.trim()) {
        AppState.studentName = inputName.value.trim();
        localStorage.setItem('student_name', AppState.studentName);
      }
      if (inputClass && inputClass.value) {
        AppState.studentClass = inputClass.value;
        localStorage.setItem('student_class', AppState.studentClass);
      }
      updatePill();
      switchTab('pretest');
    });
  }
}

// --- Navigation Tabs ---
function initNavigation() {
  const navBtns = document.querySelectorAll('[data-tab-target]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-tab-target');
      switchTab(target);
    });
  });

  // Mobile Hamburger Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      SoundFX.play('click');
      mobileDrawer.classList.toggle('hidden');
    });
  }
}

function switchTab(tabId) {
  SoundFX.play('click');
  AppState.activeTab = tabId;

  // Auto-close mobile drawer if open
  const drawer = document.getElementById('mobileDrawer');
  if (drawer && !drawer.classList.contains('hidden')) {
    drawer.classList.add('hidden');
  }

  // Update nav links styling
  document.querySelectorAll('[data-tab-target]').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab-target') === tabId;
    if (isTarget) {
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
      btn.classList.remove('text-slate-700', 'text-slate-800', 'bg-slate-100', 'hover:bg-blue-50');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-xs');
      if (btn.closest('#mobileDrawer')) {
        btn.classList.add('bg-slate-100', 'text-slate-800');
      } else {
        btn.classList.add('text-slate-700', 'hover:bg-blue-50');
      }
    }
  });

  // Hide all sections and show target
  const sections = ['beranda', 'pretest', 'materi', 'simulasi', 'posttest', 'glosarium'];
  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) {
      if (s === tabId) {
        el.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        el.classList.add('hidden');
      }
    }
  });
}

// --- Materi Viewer ---
function initMateriViewer() {
  renderChapterSidebar();
  renderChapterContent(AppState.activeChapterId);

  // Address Calculator widget logic
  const calcBase = document.getElementById('calcBaseAddress');
  const calcIndex = document.getElementById('calcElementIndex');
  const calcSize = document.getElementById('calcElementSize');
  const calcResult = document.getElementById('calcResultAddress');

  const updateCalculator = () => {
    if (!calcBase || !calcIndex || !calcSize || !calcResult) return;
    const baseVal = parseInt(calcBase.value) || 0x100;
    const idxVal = parseInt(calcIndex.value) || 0;
    const sizeVal = parseInt(calcSize.value) || 4;
    const calculated = baseVal + (idxVal * sizeVal);
    calcResult.innerHTML = `
      <span class="text-xs text-gray-500">Rumus: 0x${baseVal.toString(16).toUpperCase()} + (${idxVal} × ${sizeVal} byte) =</span>
      <span class="text-base font-bold text-emerald-600"> 0x${calculated.toString(16).toUpperCase()} (${calculated})</span>
    `;
  };

  [calcBase, calcIndex, calcSize].forEach(input => {
    if (input) input.addEventListener('input', updateCalculator);
  });
  updateCalculator();
}

function renderChapterSidebar() {
  const container = document.getElementById('materiSidebarNav');
  if (!container) return;

  container.innerHTML = LEARNING_DATA.chapters.map(ch => `
    <button onclick="changeChapter('${ch.id}')" 
      class="w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${AppState.activeChapterId === ch.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:bg-blue-50 text-gray-700 border-gray-200'}">
      <span class="px-2 py-0.5 rounded-lg text-xs font-bold ${AppState.activeChapterId === ch.id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}">${ch.number}</span>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-xs truncate">${ch.title}</h4>
        <p class="text-[11px] opacity-80 mt-0.5 line-clamp-1">${ch.readingTime} • ${ch.badge}</p>
      </div>
    </button>
  `).join('') + `
    <button onclick="changeChapter('hots')" 
      class="w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${AppState.activeChapterId === 'hots' ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white hover:bg-amber-50 text-gray-700 border-gray-200'}">
      <span class="px-2 py-0.5 rounded-lg text-xs font-bold ${AppState.activeChapterId === 'hots' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}">HOTS</span>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-xs truncate">Studi Kasus HOTS Mandiri</h4>
        <p class="text-[11px] opacity-80 mt-0.5">4 Studi Kasus & Solusi Ilmiah</p>
      </div>
    </button>
  `;
}

window.changeChapter = function(chapterId) {
  SoundFX.play('click');
  AppState.activeChapterId = chapterId;
  renderChapterSidebar();
  renderChapterContent(chapterId);
};

function renderChapterContent(chapterId) {
  const container = document.getElementById('chapterDisplayArea');
  if (!container) return;

  if (chapterId === 'hots') {
    // Render HOTS cases
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-8 soft-card-shadow border border-amber-100">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs">Evaluasi Formatif</span>
          <span class="text-xs text-gray-500">Buku Saku Halaman 20–21</span>
        </div>
        <h2 class="text-2xl font-extrabold text-gray-900 mb-2">Studi Kasus HOTS & Tantangan Logika Komputasional</h2>
        <p class="text-gray-600 text-sm mb-6">Menganalisis skenario sistem digital nyata menggunakan penalaran 4 pilar komputasional Kurikulum Merdeka.</p>

        <div class="space-y-6">
          ${LEARNING_DATA.hotsCases.map((cs, idx) => `
            <div class="border border-gray-200 rounded-2xl p-5 bg-slate-50/50">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-gray-900 text-base flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">${idx + 1}</span>
                  ${cs.title}
                </h3>
              </div>
              <div class="p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 mb-4 italic">
                "${cs.scenario}"
              </div>
              <div class="space-y-3">
                ${cs.questions.map((qObj, qIdx) => `
                  <div class="bg-white p-4 rounded-xl border border-gray-200">
                    <p class="font-semibold text-gray-900 text-xs mb-2 text-blue-900">Pertanyaan ${qIdx + 1}: ${qObj.q}</p>
                    <button onclick="toggleAnswer('ans-${cs.id}-${qIdx}')" class="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                      <span>💡 Klik untuk Buka Solusi Ilmiah</span>
                    </button>
                    <div id="ans-${cs.id}-${qIdx}" class="hidden mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950">
                      <strong>Kunci Jawaban Ilmiah:</strong><br>${qObj.answer}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return;
  }

  const ch = LEARNING_DATA.chapters.find(c => c.id === chapterId);
  if (!ch) return;

  container.innerHTML = `
    <div class="bg-white rounded-3xl p-6 sm:p-8 soft-card-shadow border border-gray-100">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">${ch.number}</span>
        <span class="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs">${ch.badge}</span>
        <span class="text-xs text-gray-400">⏱️ ${ch.readingTime}</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">${ch.title}</h2>
      <p class="text-gray-500 text-sm mb-6">${ch.subtitle}</p>

      <div class="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl mb-8 flex items-start gap-3">
        <span class="text-xl">📌</span>
        <div>
          <h5 class="font-bold text-xs text-blue-900 uppercase tracking-wide">Fokus Rangkuman Pembelajaran</h5>
          <p class="text-xs text-blue-950 mt-1">${ch.summary}</p>
        </div>
      </div>

      <div class="space-y-8">
        ${ch.sections.map(sec => `
          <div class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span>
              ${sec.title}
            </h3>
            <div class="text-sm text-gray-700 leading-relaxed">
              ${sec.content}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <button onclick="switchTab('simulasi')" class="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition">
          <span>🚀 Coba Simulasi Interaktif Materi Ini</span>
        </button>
        <span class="text-xs text-gray-400">Buku Saku Struktur Data • Ilyas Fandhi Anggara, S.Kom</span>
      </div>
    </div>
  `;
}

window.toggleAnswer = function(id) {
  SoundFX.play('click');
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
};

// --- Simulators Engine ---
function initSimulators() {
  initListSimulator();
  initStackSimulator();
  initQueueSimulator();
  initParenthesesChecker();
}

// 1. List / Array Simulator
function initListSimulator() {
  renderListCells();

  const addBtn = document.getElementById('listBtnAdd');
  const removeBtn = document.getElementById('listBtnRemove');
  const searchBtn = document.getElementById('listBtnSearch');
  const resetBtn = document.getElementById('listBtnReset');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const valInput = document.getElementById('listInputVal');
      const idxInput = document.getElementById('listInputIdx');
      const val = (valInput.value.trim() || `Item ${AppState.listData.length + 1}`).substring(0, 10);
      let idx = parseInt(idxInput.value);

      if (isNaN(idx) || idx < 0 || idx > AppState.listData.length) {
        idx = AppState.listData.length;
      }

      if (AppState.listData.length >= 8) {
        showSimAlert("List/Array Penuh!", "Kapasitas maksimum simulasi ini adalah 8 elemen.");
        SoundFX.play('alert');
        return;
      }

      AppState.listData.splice(idx, 0, { val, addr: "" });
      recalcListAddresses();
      renderListCells(idx);
      SoundFX.play('push');
      valInput.value = "";
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      const idxInput = document.getElementById('listInputIdx');
      let idx = parseInt(idxInput.value);
      if (isNaN(idx) || idx < 0 || idx >= AppState.listData.length) {
        idx = AppState.listData.length - 1;
      }
      if (AppState.listData.length === 0) {
        showSimAlert("List Kosong!", "Tidak ada elemen yang bisa dihapus.");
        SoundFX.play('alert');
        return;
      }
      AppState.listData.splice(idx, 1);
      recalcListAddresses();
      renderListCells();
      SoundFX.play('pop');
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchVal = (document.getElementById('listInputVal').value || "").trim().toLowerCase();
      if (!searchVal) {
        showSimAlert("Pencarian", "Ketik kata yang ingin dicari di kotak input nilai!");
        return;
      }
      // Step-by-step scanner animation
      let found = false;
      const cells = document.querySelectorAll('.array-cell');
      cells.forEach((c, i) => {
        setTimeout(() => {
          c.classList.add('bg-amber-200');
          SoundFX.play('click');
          if (AppState.listData[i].val.toLowerCase() === searchVal) {
            c.classList.remove('bg-amber-200');
            c.classList.add('bg-emerald-300', 'ring-4', 'ring-emerald-500');
            SoundFX.play('success');
            found = true;
            document.getElementById('listStatusText').innerHTML = `
              🎉 Data "<strong>${AppState.listData[i].val}</strong>" DITEMUKAN pada <strong>Indeks [${i}]</strong> (Alamat: ${AppState.listData[i].addr})!
            `;
          }
        }, i * 350);
      });

      setTimeout(() => {
        if (!found) {
          SoundFX.play('alert');
          document.getElementById('listStatusText').innerHTML = `
            ❌ Data "<strong>${searchVal}</strong>" TIDAK DITEMUKAN dalam List.
          `;
        }
      }, cells.length * 350 + 100);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AppState.listData = [
        { val: "Apel", addr: "0x100" },
        { val: "Jeruk", addr: "0x104" },
        { val: "Mangga", addr: "0x108" },
        { val: "Pisang", addr: "0x10C" }
      ];
      renderListCells();
      SoundFX.play('click');
      document.getElementById('listStatusText').textContent = "List berhasil di-reset ke kondisi awal.";
    });
  }
}

function recalcListAddresses() {
  AppState.listData.forEach((item, i) => {
    const hex = (AppState.baseAddress + (i * AppState.dataSize)).toString(16).toUpperCase();
    item.addr = `0x${hex}`;
  });
}

function renderListCells(highlightIdx = -1) {
  const container = document.getElementById('listVisualContainer');
  if (!container) return;
  recalcListAddresses();

  if (AppState.listData.length === 0) {
    container.innerHTML = `
      <div class="w-full py-8 text-center text-slate-400 font-mono text-sm">
        [ List Sedang Kosong Melompong ]
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.listData.map((item, idx) => `
    <div class="array-cell p-3 rounded-2xl border-2 transition-all duration-300 ${highlightIdx === idx ? 'bg-orange-50 border-orange-500 scale-105 shadow-md' : 'bg-white border-blue-200 shadow-xs'}">
      <div class="flex justify-between items-center text-[10px] text-gray-500 font-mono mb-1">
        <span class="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">Idx [${idx}]</span>
        <span class="text-gray-400">${item.addr}</span>
      </div>
      <div class="text-base font-extrabold text-gray-800 text-center py-2 truncate">
        ${item.val}
      </div>
      <div class="text-[10px] text-center text-gray-400 font-mono border-t pt-1">
        ${AppState.dataSize} bytes
      </div>
    </div>
  `).join('');
}

// 2. Stack Simulator (LIFO)
function initStackSimulator() {
  renderStackVisual();

  const pushBtn = document.getElementById('stackBtnPush');
  const popBtn = document.getElementById('stackBtnPop');
  const peekBtn = document.getElementById('stackBtnPeek');
  const clearBtn = document.getElementById('stackBtnClear');

  if (pushBtn) {
    pushBtn.addEventListener('click', () => {
      const input = document.getElementById('stackInputVal');
      const val = (input.value.trim() || `Item ${AppState.stackData.length + 1}`).substring(0, 15);

      if (AppState.stackData.length >= AppState.maxStackSize) {
        SoundFX.play('alert');
        showSimAlert("🚨 STACK OVERFLOW!", "Kapasitas tabung memori stack sudah penuh! Tidak bisa melakukan Push lagi, jika dipaksa program akan crash!");
        return;
      }

      AppState.stackData.push(val);
      SoundFX.play('push');
      renderStackVisual();
      input.value = "";
      document.getElementById('stackStatusText').innerHTML = `
        ⬇️ Berhasil <strong>Push("${val}")</strong> ke puncak Top (Tinggi: ${AppState.stackData.length}/${AppState.maxStackSize}).
      `;
    });
  }

  if (popBtn) {
    popBtn.addEventListener('click', () => {
      if (AppState.stackData.length === 0) {
        SoundFX.play('alert');
        showSimAlert("🕳️ STACK UNDERFLOW!", "Tumpukan kosong melompong (IsEmpty)! Tidak ada elemen yang bisa diambil via operasi Pop()!");
        return;
      }

      const popped = AppState.stackData.pop();
      SoundFX.play('pop');
      renderStackVisual();
      document.getElementById('stackStatusText').innerHTML = `
        ⬆️ Berhasil <strong>Pop()</strong>: Mengeluarkan "<strong>${popped}</strong>" dari puncak Top!
      `;
    });
  }

  if (peekBtn) {
    peekBtn.addEventListener('click', () => {
      if (AppState.stackData.length === 0) {
        SoundFX.play('alert');
        showSimAlert("Peek Gagal", "Stack sedang kosong. Tidak ada elemen Top.");
        return;
      }
      SoundFX.play('success');
      const topVal = AppState.stackData[AppState.stackData.length - 1];
      const topIdx = AppState.stackData.length - 1;
      document.getElementById('stackStatusText').innerHTML = `
        👁️ <strong>Peek()</strong>: Elemen puncak saat ini adalah "<strong>${topVal}</strong>" pada indeks Top = ${topIdx}.
      `;
      // visual glow
      const topEl = document.querySelector('.stack-item:first-child');
      if (topEl) {
        topEl.classList.add('ring-4', 'ring-amber-400');
        setTimeout(() => topEl.classList.remove('ring-4', 'ring-amber-400'), 1000);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      AppState.stackData = [];
      renderStackVisual();
      SoundFX.play('click');
      document.getElementById('stackStatusText').textContent = "Stack dikosongkan (IsEmpty = True).";
    });
  }
}

function renderStackVisual() {
  const container = document.getElementById('stackCylinder');
  const topIndicator = document.getElementById('stackTopIndicator');
  if (!container) return;

  if (AppState.stackData.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-gray-400 font-mono py-20 text-center">
        [ Stack Kosong ]
      </div>
    `;
    if (topIndicator) topIndicator.textContent = "Top: NULL (-1)";
    return;
  }

  // Flex direction is column-reverse, so last element in array is rendered at top visually
  const colors = [
    'bg-blue-500 text-white',
    'bg-indigo-500 text-white',
    'bg-cyan-500 text-white',
    'bg-amber-500 text-white',
    'bg-emerald-500 text-white',
    'bg-purple-500 text-white'
  ];

  container.innerHTML = AppState.stackData.map((val, idx) => {
    const isTop = idx === AppState.stackData.length - 1;
    const colorClass = colors[idx % colors.length];
    return `
      <div class="stack-item ${colorClass} ${isTop ? 'border-2 border-yellow-300' : ''}">
        <div class="flex items-center justify-between text-[10px] font-mono opacity-90">
          <span>[${idx}]</span>
          ${isTop ? '<span class="bg-yellow-400 text-black px-1.5 py-0.2 rounded font-extrabold text-[9px]">TOP</span>' : ''}
        </div>
        <div class="text-sm font-bold truncate">${val}</div>
      </div>
    `;
  }).join('');

  if (topIndicator) {
    topIndicator.textContent = `Top: Indeks [${AppState.stackData.length - 1}] (${AppState.stackData[AppState.stackData.length - 1]})`;
  }
}

// 3. Parentheses Validator Simulator (HOTS Tantangan 3)
function initParenthesesChecker() {
  const checkBtn = document.getElementById('btnCheckParentheses');
  const inputFormula = document.getElementById('inputFormula');
  const resultBox = document.getElementById('parenthesesResult');

  if (!checkBtn || !inputFormula || !resultBox) return;

  checkBtn.addEventListener('click', () => {
    const expr = inputFormula.value.trim();
    if (!expr) {
      resultBox.innerHTML = '<span class="text-amber-600">Ketik rumus terlebih dahulu!</span>';
      return;
    }

    const stack = [];
    const steps = [];
    let valid = true;
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if (['(', '[', '{'].includes(char)) {
        stack.push(char);
        steps.push(`Karakter '${char}': PUSH ke stack ➔ Stack terkini: [ ${stack.join(', ')} ]`);
      } else if ([')', ']', '}'].includes(char)) {
        if (stack.length === 0) {
          valid = false;
          steps.push(`Karakter '${char}': GAGAL! Ditemukan kurung tutup tapi stack kosong (Underflow).`);
          break;
        }
        const popped = stack.pop();
        if (popped !== pairs[char]) {
          valid = false;
          steps.push(`Karakter '${char}': GAGAL! Kurung '${char}' tidak cocok dengan pasangan '${popped}'.`);
          break;
        } else {
          steps.push(`Karakter '${char}': Cocok dengan '${popped}' ➔ POP berhasil ➔ Stack: [ ${stack.join(', ')} ]`);
        }
      }
    }

    if (valid && stack.length > 0) {
      valid = false;
      steps.push(`Akhir ekspresi: GAGAL! Ada kurung buka [ ${stack.join(', ')} ] yang belum ditutup.`);
    }

    if (valid) {
      SoundFX.play('success');
      resultBox.innerHTML = `
        <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs">
          <p class="font-bold text-sm mb-1">✅ VALID! Pasangan Tanda Kurung Seimbang Sempurna.</p>
          <div class="font-mono text-[11px] space-y-1 mt-2 text-emerald-800">
            ${steps.map(s => `<div>• ${s}</div>`).join('')}
          </div>
        </div>
      `;
    } else {
      SoundFX.play('alert');
      resultBox.innerHTML = `
        <div class="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 text-xs">
          <p class="font-bold text-sm mb-1">❌ TIDAK VALID! Terjadi Ketidaksesuaian Kurung.</p>
          <div class="font-mono text-[11px] space-y-1 mt-2 text-rose-800">
            ${steps.map(s => `<div>• ${s}</div>`).join('')}
          </div>
        </div>
      `;
    }
  });
}

// 4. Queue Simulator (FIFO)
function initQueueSimulator() {
  renderQueueVisual();

  const enqueueBtn = document.getElementById('queueBtnEnqueue');
  const dequeueBtn = document.getElementById('queueBtnDequeue');
  const peekBtn = document.getElementById('queueBtnPeek');
  const clearBtn = document.getElementById('queueBtnClear');

  if (enqueueBtn) {
    enqueueBtn.addEventListener('click', () => {
      const input = document.getElementById('queueInputVal');
      const val = (input.value.trim() || `Antrean ${AppState.queueData.length + 1}`).substring(0, 15);

      if (AppState.queueData.length >= AppState.maxQueueSize) {
        SoundFX.play('alert');
        showSimAlert("Antrean Penuh!", "Kapasitas buffer antrean maksimum (6 elemen) telah tercapai!");
        return;
      }

      AppState.queueData.push(val);
      SoundFX.play('push');
      renderQueueVisual();
      input.value = "";
      document.getElementById('queueStatusText').innerHTML = `
        🚪 Berhasil <strong>Enqueue("${val}")</strong> masuk di bagian <strong>REAR</strong>.
      `;
    });
  }

  if (dequeueBtn) {
    dequeueBtn.addEventListener('click', () => {
      if (AppState.queueData.length === 0) {
        SoundFX.play('alert');
        showSimAlert("Antrean Kosong!", "Tidak ada antrean yang bisa dilayani (Queue Empty)!");
        return;
      }

      const dequeued = AppState.queueData.shift();
      SoundFX.play('pop');
      renderQueueVisual();
      document.getElementById('queueStatusText').innerHTML = `
        🎟️ Berhasil <strong>Dequeue()</strong>: Melayani "<strong>${dequeued}</strong>" keluar dari <strong>FRONT</strong>!
      `;
    });
  }

  if (peekBtn) {
    peekBtn.addEventListener('click', () => {
      if (AppState.queueData.length === 0) {
        SoundFX.play('alert');
        showSimAlert("Peek Gagal", "Antrean sedang kosong.");
        return;
      }
      SoundFX.play('success');
      const frontVal = AppState.queueData[0];
      document.getElementById('queueStatusText').innerHTML = `
        👁️ <strong>Front()</strong>: Pelanggan terdepan saat ini adalah "<strong>${frontVal}</strong>".
      `;
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      AppState.queueData = [];
      renderQueueVisual();
      SoundFX.play('click');
      document.getElementById('queueStatusText').textContent = "Antrean dikosongkan.";
    });
  }
}

function renderQueueVisual() {
  const container = document.getElementById('queuePipe');
  if (!container) return;

  if (AppState.queueData.length === 0) {
    container.innerHTML = `
      <div class="w-full text-xs text-gray-400 font-mono py-8 text-center">
        [ Antrean Sedang Kosong (IsEmpty = True) ]
      </div>
    `;
    return;
  }

  const colors = [
    'bg-teal-500 text-white',
    'bg-emerald-500 text-white',
    'bg-blue-500 text-white',
    'bg-indigo-500 text-white',
    'bg-purple-500 text-white',
    'bg-amber-500 text-white'
  ];

  container.innerHTML = AppState.queueData.map((val, idx) => {
    const isFront = idx === 0;
    const isRear = idx === AppState.queueData.length - 1;
    const colorClass = colors[idx % colors.length];

    return `
      <div class="queue-item ${colorClass} ${isFront ? 'ring-4 ring-yellow-300' : ''}">
        <div class="flex items-center justify-between text-[10px] font-mono opacity-90 mb-1">
          <span>#${idx + 1}</span>
          <div>
            ${isFront ? '<span class="bg-yellow-400 text-black px-1 py-0.2 rounded font-extrabold text-[9px] mr-1">FRONT</span>' : ''}
            ${isRear ? '<span class="bg-rose-500 text-white px-1 py-0.2 rounded font-extrabold text-[9px]">REAR</span>' : ''}
          </div>
        </div>
        <div class="text-xs font-bold truncate">${val}</div>
      </div>
    `;
  }).join('');
}

// --- Glossary Search ---
function initGlossary() {
  renderGlossaryItems(LEARNING_DATA.glossary);

  const searchInput = document.getElementById('glossarySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = LEARNING_DATA.glossary.filter(item => 
        item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q)
      );
      renderGlossaryItems(filtered);
    });
  }
}

function renderGlossaryItems(items) {
  const container = document.getElementById('glossaryGrid');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-gray-400">
        🔍 Istilah tidak ditemukan dalam kamus informatika.
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="bg-white p-5 rounded-2xl border border-gray-100 soft-card-shadow soft-card-shadow-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-gray-900 text-sm text-blue-900">${item.term}</h4>
          <span class="text-[10px] bg-blue-50 text-blue-700 font-mono px-2 py-0.5 rounded-full font-semibold">Definisi</span>
        </div>
        <p class="text-xs text-gray-600 leading-relaxed">${item.def}</p>
      </div>
    </div>
  `).join('');
}

// --- Pre-Test Logic ---
let preTestUserAnswers = {};

function initPreTest() {
  const container = document.getElementById('preTestQuestionsContainer');
  if (!container) return;

  container.innerHTML = LEARNING_DATA.preTestQuestions.map((q, idx) => `
    <div class="bg-white p-5 rounded-2xl border border-gray-200 mb-4 soft-card-shadow" id="pre-q-${q.id}">
      <div class="flex items-center gap-2 mb-3">
        <span class="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">${idx + 1}</span>
        <span class="text-xs text-gray-400 font-mono">Soal Diagnostik Awal</span>
      </div>
      <p class="font-bold text-sm text-gray-900 mb-4">${q.question}</p>
      <div class="space-y-2">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50 cursor-pointer transition text-xs text-gray-700">
            <input type="radio" name="pretest-q-${q.id}" value="${optIdx}" onchange="selectPreTestAnswer(${q.id}, ${optIdx})" class="accent-blue-600 w-4 h-4">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <div id="pre-feedback-${q.id}" class="hidden mt-3 p-3 rounded-xl text-xs"></div>
    </div>
  `).join('');

  const submitBtn = document.getElementById('btnSubmitPreTest');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      calculatePreTestScore();
    });
  }
}

window.selectPreTestAnswer = function(qId, optIdx) {
  SoundFX.play('click');
  preTestUserAnswers[qId] = optIdx;
};

function calculatePreTestScore() {
  let correctCount = 0;
  let answeredCount = 0;
  const total = LEARNING_DATA.preTestQuestions.length;

  LEARNING_DATA.preTestQuestions.forEach(q => {
    const userAns = preTestUserAnswers[q.id];
    const feedbackEl = document.getElementById(`pre-feedback-${q.id}`);
    if (userAns !== undefined) {
      answeredCount++;
      if (userAns === q.correctIndex) {
        correctCount++;
        if (feedbackEl) {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-emerald-50 border border-emerald-200 text-emerald-900';
          feedbackEl.innerHTML = `<strong>✅ Benar!</strong> ${q.explanation}`;
          feedbackEl.classList.remove('hidden');
        }
      } else {
        if (feedbackEl) {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-rose-50 border border-rose-200 text-rose-900';
          const optLetter = String.fromCharCode(65 + q.correctIndex);
          feedbackEl.innerHTML = `<strong>❌ Kurang Tepat.</strong> Jawaban yang benar adalah pilihan <strong>(${optLetter})</strong>. ${q.explanation}`;
          feedbackEl.classList.remove('hidden');
        }
      }
    }
  });

  if (answeredCount < total) {
    alert(`Mohon jawab seluruh ${total} soal pre-test (kamu baru menjawab ${answeredCount}/${total} soal)!`);
    return;
  }

  const score = Math.round((correctCount / total) * 100);
  AppState.preTestScore = score;
  localStorage.setItem('pretest_score', score);
  SoundFX.play('success');

  const resultContainer = document.getElementById('preTestResultSummary');
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('preTestScoreDisplay').textContent = `${score} / 100`;
  }

  // Kirim otomatis ke Google Spreadsheet
  sendResultToGoogleSheets('Pre-Test', score, correctCount, preTestUserAnswers);
}

// --- Post-Test Logic ---
let postTestUserAnswers = {};

function initPostTest() {
  const container = document.getElementById('postTestQuestionsContainer');
  if (!container) return;

  container.innerHTML = LEARNING_DATA.postTestQuestions.map((q, idx) => `
    <div class="bg-white p-5 rounded-2xl border border-gray-200 mb-4 soft-card-shadow" id="post-q-${q.id}">
      <div class="flex items-center gap-2 mb-3">
        <span class="w-7 h-7 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center justify-center">${idx + 1}</span>
        <span class="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">Asesmen HOTS</span>
      </div>
      <p class="font-bold text-sm text-gray-900 mb-4">${q.question}</p>
      <div class="space-y-2">
        ${q.options.map((opt, optIdx) => `
          <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-orange-50 cursor-pointer transition text-xs text-gray-700">
            <input type="radio" name="posttest-q-${q.id}" value="${optIdx}" onchange="selectPostTestAnswer(${q.id}, ${optIdx})" class="accent-orange-600 w-4 h-4">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <div id="post-feedback-${q.id}" class="hidden mt-3 p-3 rounded-xl text-xs"></div>
    </div>
  `).join('');

  const submitBtn = document.getElementById('btnSubmitPostTest');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      calculatePostTestScore();
    });
  }
}

window.selectPostTestAnswer = function(qId, optIdx) {
  SoundFX.play('click');
  postTestUserAnswers[qId] = optIdx;
};

function calculatePostTestScore() {
  let correctCount = 0;
  let answeredCount = 0;
  const total = LEARNING_DATA.postTestQuestions.length;

  LEARNING_DATA.postTestQuestions.forEach(q => {
    const userAns = postTestUserAnswers[q.id];
    const feedbackEl = document.getElementById(`post-feedback-${q.id}`);
    if (userAns !== undefined) {
      answeredCount++;
      if (userAns === q.correctIndex) {
        correctCount++;
        if (feedbackEl) {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-emerald-50 border border-emerald-200 text-emerald-900';
          feedbackEl.innerHTML = `<strong>✅ Benar!</strong> ${q.explanation}`;
          feedbackEl.classList.remove('hidden');
        }
      } else {
        if (feedbackEl) {
          feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs bg-rose-50 border border-rose-200 text-rose-900';
          const optLetter = String.fromCharCode(65 + q.correctIndex);
          feedbackEl.innerHTML = `<strong>❌ Kurang Tepat.</strong> Jawaban yang benar adalah pilihan <strong>(${optLetter})</strong>. ${q.explanation}`;
          feedbackEl.classList.remove('hidden');
        }
      }
    }
  });

  if (answeredCount < total) {
    alert(`Mohon jawab seluruh ${total} soal evaluasi post-test (kamu baru menjawab ${answeredCount}/${total} soal)!`);
    return;
  }

  const score = Math.round((correctCount / total) * 100);
  AppState.postTestScore = score;
  localStorage.setItem('posttest_score', score);
  SoundFX.play('success');

  const resultContainer = document.getElementById('postTestResultSummary');
  if (resultContainer) {
    resultContainer.classList.remove('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('postTestScoreDisplay').textContent = `${score} / 100`;

    // Comparison with Pre-Test
    const preScore = AppState.preTestScore;
    const diffEl = document.getElementById('postTestScoreImprovement');
    if (diffEl) {
      if (preScore !== null) {
        const diff = score - preScore;
        const sign = diff >= 0 ? `+${diff}` : `${diff}`;
        diffEl.innerHTML = `
          Skor Pre-Test Awal: <strong>${preScore}</strong> ➔ Skor Post-Test: <strong>${score}</strong> 
          <span class="inline-block ml-2 px-2 py-0.5 rounded font-bold ${diff >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
            (Peningkatan: ${sign} Poin)
          </span>
        `;
      } else {
        diffEl.innerHTML = `Kamu belum mengerjakan Pre-Test untuk perbandingan nilai kenaikan.`;
      }
    }
  }

  // Kirim otomatis ke Google Spreadsheet
  sendResultToGoogleSheets('Post-Test', score, correctCount, postTestUserAnswers);
}

// Utility Alert Modal
function showSimAlert(title, message) {
  alert(`${title}\n\n${message}`);
}

// ================= GOOGLE SPREADSHEET INTEGRATION =================
function sendResultToGoogleSheets(testType, score, correctCount, userAnswers) {
  let url = localStorage.getItem('google_sheet_url');
  if (!url || !url.trim().startsWith('http')) {
    url = LEARNING_DATA.googleSheetWebAppUrl || '';
  }
  
  // Format jawaban Soal 1 s.d. 6
  const qAnswers = {};
  for (let i = 1; i <= 6; i++) {
    const ansIdx = userAnswers[i];
    qAnswers[`q${i}`] = ansIdx !== undefined ? String.fromCharCode(65 + ansIdx) : "-";
  }

  const payload = {
    timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
    testType: testType,
    studentName: AppState.studentName || "Siswa Kelas X",
    studentClass: AppState.studentClass || "Fase E",
    score: score,
    correctCount: correctCount,
    totalQuestions: 6,
    ...qAnswers
  };

  // Simpan ke cadangan riwayat lokal browser
  try {
    const history = JSON.parse(localStorage.getItem('quiz_submissions_history') || '[]');
    history.push(payload);
    localStorage.setItem('quiz_submissions_history', JSON.stringify(history));
    updateHistoryBadge();
  } catch (e) {
    console.warn("Gagal simpan ke localStorage:", e);
  }

  const statusEl = document.getElementById(testType === 'Pre-Test' ? 'preSheetStatus' : 'postSheetStatus');

  if (url && url.trim().startsWith('http')) {
    if (statusEl) {
      statusEl.className = 'mt-3 p-3 rounded-xl text-xs bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-2';
      statusEl.innerHTML = `<span>⏳</span> <span>Sedang mengirim jawaban ke Google Spreadsheet Guru...</span>`;
      statusEl.classList.remove('hidden');
    }

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      if (statusEl) {
        statusEl.className = 'mt-3 p-3 rounded-xl text-xs bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2';
        statusEl.innerHTML = `<span>✅</span> <span><strong>Tersimpan!</strong> Jawaban dan skor ${testType} Anda telah otomatis masuk ke Google Spreadsheet Guru.</span>`;
      }
    })
    .catch((err) => {
      console.warn("Gagal kirim ke spreadsheet:", err);
      if (statusEl) {
        statusEl.className = 'mt-3 p-3 rounded-xl text-xs bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2';
        statusEl.innerHTML = `<span>⚠️</span> <span>Jawaban tersimpan di memori perangkat lokal (Gagal koneksi webhook spreadsheet).</span>`;
      }
    });
  } else {
    if (statusEl) {
      statusEl.className = 'mt-3 p-3 rounded-xl text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-2';
      statusEl.innerHTML = `
        <span class="flex items-center gap-1.5">💾 Jawaban berhasil tersimpan di sistem.</span>
      `;
      statusEl.classList.remove('hidden');
    }
  }
}

function updateHistoryBadge() {
  const badge = document.getElementById('historyCountBadge');
  if (!badge) return;
  try {
    const history = JSON.parse(localStorage.getItem('quiz_submissions_history') || '[]');
    badge.textContent = `${history.length} Data Tersimpan`;
  } catch (e) {}
}

function initSpreadsheetManager() {
  // Integrasi Google Spreadsheet berjalan otomatis di latar belakang saat siswa menyelesaikan Pre-Test atau Post-Test.
  // URL Webhook tersimpan di data.js: LEARNING_DATA.googleSheetWebAppUrl
}

function exportSubmissionsToCSV() {
  SoundFX.play('click');
  const history = JSON.parse(localStorage.getItem('quiz_submissions_history') || '[]');
  if (history.length === 0) {
    alert("Belum ada data pengerjaan kuis siswa yang tersimpan di perangkat ini.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Waktu Submit,Tipe Ujian,Nama Siswa,Kelas,Skor,Jumlah Benar,Total Soal,Soal 1,Soal 2,Soal 3,Soal 4,Soal 5,Soal 6\n";

  history.forEach(row => {
    const line = [
      `"${row.timestamp || ''}"`,
      `"${row.testType || ''}"`,
      `"${row.studentName || ''}"`,
      `"${row.studentClass || ''}"`,
      row.score !== undefined ? row.score : '',
      row.correctCount !== undefined ? row.correctCount : '',
      row.totalQuestions || 6,
      `"${row.q1 || '-'}"`,
      `"${row.q2 || '-'}"`,
      `"${row.q3 || '-'}"`,
      `"${row.q4 || '-'}"`,
      `"${row.q5 || '-'}"`,
      `"${row.q6 || '-'}"`
    ].join(',');
    csvContent += line + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Nilai_Siswa_StrukturData_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

