// THANAFUS Dars Fest 2026 - Shared Database System

const DEFAULT_DB = {
  teams: [
    { id: "team-1", name: "Al Fath", captain: "Ahmad Riza", viceCaptain: "Basim K.P.", members: ["Ahmad Riza", "Faris Rahman", "Zayd Ali", "Yousuf Hasan", "Basim K.P."], totalScore: 0, rank: 1, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-2", name: "Al Buruj", captain: "Safwan K.", viceCaptain: "Dilshad", members: ["Safwan K.", "Shamil V.P.", "Adnan Shah", "Raihan Ali", "Dilshad"], totalScore: 0, rank: 2, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-3", name: "Al Najm", captain: "Minhaj Uddin", viceCaptain: "Anas K.", members: ["Minhaj Uddin", "Nuaim P.", "Ajmal K.T.", "Jasir M.", "Anas K."], totalScore: 0, rank: 3, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-4", name: "Al Qalam", captain: "Luqmanul Hakeem", viceCaptain: "Sahal", members: ["Luqmanul Hakeem", "Ashraf Ali", "Ramil K.", "Hisham P.", "Sahal"], totalScore: 0, rank: 4, grades: { A: 0, B: 0, C: 0 }, wins: [] }
  ],
  students: [
    // Sub Junior
    { id: "stud-1", name: "Faris Rahman", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-2", name: "Shamil V.P.", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-3", name: "Nuaim P.", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-4", name: "Ashraf Ali", teamId: "team-4", category: "Sub Junior", photo: "" },
    // Junior
    { id: "stud-5", name: "Zayd Ali", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-6", name: "Adnan Shah", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-7", name: "Ajmal K.T.", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-8", name: "Ramil K.", teamId: "team-4", category: "Junior", photo: "" },
    // Senior
    { id: "stud-9", name: "Yousuf Hasan", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-10", name: "Raihan Ali", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-11", name: "Jasir M.", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-12", name: "Hisham P.", teamId: "team-4", category: "Senior", photo: "" }
  ],
  programmes: [
    { id: "prog-1", name: "Quran Recitation", category: "Sub Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: false, results: [] },
    { id: "prog-2", name: "Speech", category: "Sub Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Faisal Ahsani", resultsPublished: false, results: [] },
    { id: "prog-3", name: "Mappilappattu", category: "Sub Junior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Salim Darimi", resultsPublished: false, results: [] },
    
    { id: "prog-4", name: "Quran Recitation", category: "Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: false, results: [] },
    { id: "prog-5", name: "Quiz", category: "Junior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: false, results: [] },
    { id: "prog-6", name: "Essay Writing", category: "Junior", type: "individual", venue: "Class Room 4", judge: "Usthad Abdul Rasheed", resultsPublished: false, results: [] },

    { id: "prog-7", name: "Speech", category: "Senior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Faisal Ahsani", resultsPublished: false, results: [] },
    { id: "prog-8", name: "Quiz", category: "Senior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: false, results: [] },
    { id: "prog-9", name: "Story Writing", category: "Senior", type: "individual", venue: "Class Room 5", judge: "Usthad Najeeb Hudawi", resultsPublished: false, results: [] }
  ],
  notifications: [
    { id: "notif-1", title: "THANAFUS Dars Fest 2026 Live", content: "Welcome to THANAFUS Dars Fest 2026. Live stage evaluations and event announcements will appear here in real time.", type: "info", date: "2026-07-03T09:00:00Z" },
    { id: "notif-2", title: "Appeal Panel Active", content: "All appeals regarding published results must be submitted within 1 hour of the official announcement.", type: "warning", date: "2026-07-03T11:30:00Z" },
    { id: "notif-3", title: "Venue Schedule Announced", content: "Events are taking place across Imam Bukhari Stage, Imam Malik Stage, and designated classrooms.", type: "info", date: "2026-07-03T13:00:00Z" }
  ],
  appeals: [
    { id: "appl-1", studentName: "Shamil V.P.", team: "Al Buruj", category: "Sub Junior", programme: "Speech", phoneNumber: "9876543210", description: "Requesting re-evaluation of my speech. I believe there was a calculation mismatch in the scoring sheet.", status: "Approved", response: "Re-evaluation completed. The rank remains unchanged, but points corrected.", date: "2026-07-03T14:00:00Z" }
  ],
  gallery: [
    { id: "gal-1", type: "image", title: "Inauguration Ceremony", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop", day: "Day 1", category: "General", event: "Inaugural Session" },
    { id: "gal-2", type: "image", title: "Quran Recitation Sub Junior", url: "https://images.unsplash.com/photo-1584281729055-df13fb254bfb?w=800&auto=format&fit=crop", day: "Day 1", category: "Sub Junior", event: "Quran Recitation" },
    { id: "gal-3", type: "image", title: "Senior Speech Stage", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop", day: "Day 1", category: "Senior", event: "Speech" },
    { id: "gal-4", type: "video", title: "Fest Highlights Day 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", day: "Day 1", category: "General", event: "Overall Highlights" }
  ],
  contact: {
    coordinatorName: "Usthad K.M. Shafi Hudawi",
    coordinatorPhone: "+91 9988776655",
    techSupportName: "Thanafus IT Support Team",
    techSupportPhone: "+91 8877665544",
    email: "info@thanafusfest.com",
    address: "THANAFUS Dars Fest Committee Office, Markaz Campus, Calicut, Kerala, 673573"
  },
  messages: [],
  settings: {
    prospectusUrl: "", // Base64 or standard URL
    adminPassword: "admin@9526"
  }
};

class Database {
  constructor() {
    this.loadedFromServer = false;
    this._saving = false;
    this._dirty = false;
    
    // Fast local cache hydration for zero-lag instant rendering
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem('thanafus_fest_db_cache');
        if (cached) {
          this.db = JSON.parse(cached);
        }
      }
    } catch (e) { /* silent */ }

    if (!this.db || !this.db.teams) {
      this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    }
    this._ensureDbDefaults();

    this._loadPromise = this.load();
    this._loadPromise.then(() => this.calculateLeaderboard());
  }

  _ensureDbDefaults() {
    if (!this.db || typeof this.db !== 'object') this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    this.db.teams = Array.isArray(this.db.teams) ? this.db.teams : [];
    this.db.students = Array.isArray(this.db.students) ? this.db.students : [];
    this.db.programmes = Array.isArray(this.db.programmes) ? this.db.programmes : [];
    this.db.notifications = Array.isArray(this.db.notifications) ? this.db.notifications : [];
    this.db.appeals = Array.isArray(this.db.appeals) ? this.db.appeals : [];
    this.db.gallery = Array.isArray(this.db.gallery) ? this.db.gallery : [];
    this.db.messages = Array.isArray(this.db.messages) ? this.db.messages : [];
    this.db.penalties = Array.isArray(this.db.penalties) ? this.db.penalties : [];
    this.db.contact = (this.db.contact && typeof this.db.contact === 'object') ? this.db.contact : JSON.parse(JSON.stringify(DEFAULT_DB.contact));
    this.db.settings = (this.db.settings && typeof this.db.settings === 'object') ? this.db.settings : JSON.parse(JSON.stringify(DEFAULT_DB.settings));
    if (!this.db.settings.adminPassword) this.db.settings.adminPassword = "admin@9526";
  }

  async load() {
    try {
      const response = await fetch('/api/all', { cache: 'no-store' });
      if (response.ok) {
        const serverData = await response.json();
        if (serverData && typeof serverData === 'object') {
          this.db = serverData;
          this._ensureDbDefaults();
          if (typeof this.db.revision !== 'number') this.db.revision = 0;
          this.loadedFromServer = true;
          this._persistLocal();
        }
      } else {
        throw new Error('Failed to load data from API: ' + response.status);
      }
    } catch (e) {
      console.warn("Database loaded from local state / fallback:", e.message || e);
      this.loadedFromServer = false;
      this._ensureDbDefaults();
      if (typeof window !== 'undefined' && window.__onDbLoadFail) {
        window.__onDbLoadFail(e);
      }
    }
  }

  _persistLocal() {
    try {
      if (typeof localStorage !== 'undefined' && this.db) {
        localStorage.setItem('thanafus_fest_db_cache', JSON.stringify(this.db));
      }
    } catch (e) { /* storage quota or restricted */ }
  }

  async ready() {
    await this._loadPromise;
  }

  save(isReset, collectionName) {
    if (collectionName) {
      this._dirtyCollections = this._dirtyCollections || new Set();
      this._dirtyCollections.add(collectionName);
    }
    this._persistLocal();
    if (!this.loadedFromServer && !isReset && !this._allowUnpublishAll) {
      console.warn('Save queued: using local state until server reconnected.');
    }
    if (isReset || this._allowUnpublishAll) this._pendingReset = true;
    this._dirty = true;
    this._flushSave();
  }

  // Serializes saves so out-of-order responses can never reorder writes.
  // Sends a minimal delta payload of only changed collections to prevent lagging/timeouts.
  _flushSave() {
    if (this._saving) return;
    if (!this._dirty) return;
    this._dirty = false;
    this._saving = true;

    // Create partial sync payload
    const payload = {
      revision: this.db.revision || 0
    };

    if (this._pendingReset || this._allowUnpublishAll || !this._dirtyCollections || this._dirtyCollections.size === 0) {
      // Send full snapshot on reset or fallback
      Object.assign(payload, this.db);
    } else {
      // Send only changed collections
      this._dirtyCollections.forEach(col => {
        payload[col] = this.db[col];
      });
      // Always include settings to preserve credentials/revision
      payload.settings = this.db.settings;
    }
    
    // Clear dirty set for next save
    this._dirtyCollections = new Set();

    if (this._pendingReset || this._allowUnpublishAll || this.loadedFromServer) { 
      payload.allowUnpublishAll = true;
      payload.clientVerified = true;
      payload.allowUnpublish = true;
    }
    if (this._pendingReset) {
      payload.reset = true;
      this._pendingReset = false;
    }
    this._allowUnpublishAll = false;

    fetch('/api/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            const e = new Error(err.error || ('Server rejected the save (HTTP ' + res.status + ')'));
            e.isStale = (res.status === 409);
            throw e;
          });
        }
        return res.json();
      })
      .then(data => {
        this._retries = 0;
        if (this._dirty) {
          if (data && typeof data.revision === 'number') this.db.revision = data.revision;
        } else {
          // Adopt the updated full database payload from server
          this.db = data;
        }
        this.loadedFromServer = true;
        this._persistLocal();
        console.log('Database synchronized with server');
        this._saving = false;
        this._flushSave();
      })
      .catch(e => {
        this._saving = false;
        console.error('API sync notice:', e.message || e);
        if (e && e.isStale) {
          this._dirty = false;
          this._retries = 0;
          if (typeof window !== 'undefined' && window.__onDbSaveError) window.__onDbSaveError(e);
          return;
        }
        this._dirty = true;
        if (this._retries === undefined) this._retries = 0;
        this._retries++;
        if (this._retries <= 3) {
          setTimeout(() => { if (this._dirty) this._flushSave(); }, 2000);
        } else {
          this._retries = 0;
          this._dirty = false;
          if (typeof window !== 'undefined' && window.__onDbSaveError) window.__onDbSaveError(e);
        }
      });
  }

  reset() {
    this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    this._persistLocal();
    this.save(true);
    this.calculateLeaderboard();
  }

  // Calculate points according to rule:
  // Individual: 1+A=10, 1+B=8, 1+C=6 | 2+A=8, 2+B=6, 2+C=4 | 3+A=6, 3+B=4, 3+C=2
  // Rank only (no grade): 1st=5, 2nd=3, 3rd=1
  // Grade only (no rank): A=5, B=3, C=1
  calculatePoints(rank, grade) {
    const r = parseInt(rank) || null;
    const g = grade ? grade.toUpperCase().trim() : null;

    if (r === 1) {
      if (g === 'A') return 10;
      if (g === 'B') return 8;
      if (g === 'C') return 6;
      return 5;
    } else if (r === 2) {
      if (g === 'A') return 8;
      if (g === 'B') return 6;
      if (g === 'C') return 4;
      return 3;
    } else if (r === 3) {
      if (g === 'A') return 6;
      if (g === 'B') return 4;
      if (g === 'C') return 2;
      return 1;
    } else {
      if (g === 'A') return 5;
      if (g === 'B') return 3;
      if (g === 'C') return 1;
      return 0;
    }
  }

  // Group/General event scoring:
  // 1+A=15, 1+B=13, 1+C=11 | 2+A=13, 2+B=11, 2+C=9 | 3+A=11, 3+B=9, 3+C=7
  // Rank only (no grade): 1st=10, 2nd=8, 3rd=6
  // Grade only (no rank): A=5, B=3, C=1
  calculateGroupPoints(rank, grade) {
    const r = parseInt(rank) || null;
    const g = grade ? grade.toUpperCase().trim() : null;

    if (r === 1) {
      if (g === 'A') return 15;
      if (g === 'B') return 13;
      if (g === 'C') return 11;
      return 10;
    } else if (r === 2) {
      if (g === 'A') return 13;
      if (g === 'B') return 11;
      if (g === 'C') return 9;
      return 8;
    } else if (r === 3) {
      if (g === 'A') return 11;
      if (g === 'B') return 9;
      if (g === 'C') return 7;
      return 6;
    } else {
      if (g === 'A') return 5;
      if (g === 'B') return 3;
      if (g === 'C') return 1;
      return 0;
    }
  }

  // Programme points by type (individual vs group)
  programmePoints(prog, rank, grade) {
    const isGroup = prog.type === 'group' || prog.category === 'General';
    return isGroup ? this.calculateGroupPoints(rank, grade) : this.calculatePoints(rank, grade);
  }

  calculateLeaderboard() {
    // Reset Team scores, grades counts and wins
    this.db.teams.forEach(team => {
      team.totalScore = 0;
      team.grades = { A: 0, B: 0, C: 0 };
      team.wins = [];
    });

    // Walk through all published programmes
    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished) return;

      prog.results.forEach(res => {
        let team = null;
        let studentName = "";

        if (prog.category === 'General') {
          // General team event: score goes to the participating team directly
          team = this.db.teams.find(t => t.id === (res.teamId || prog.teamId));
          studentName = team ? team.name : "Team";
        } else {
          const student = this.db.students.find(s => s.id === res.studentId);
          if (!student) return;
          team = this.db.teams.find(t => t.id === student.teamId);
          studentName = student.name;
        }
        if (!team) return;

        const pts = this.programmePoints(prog, res.rank, res.grade);
        team.totalScore += pts;

        if (res.grade === 'A') team.grades.A++;
        if (res.grade === 'B') team.grades.B++;
        if (res.grade === 'C') team.grades.C++;

        if (res.rank === 1 || res.rank === 2 || res.rank === 3) {
          team.wins.push({
            programmeId: prog.id,
            programmeName: prog.name,
            category: prog.category,
            studentName: studentName,
            rank: res.rank,
            grade: res.grade,
            points: pts
          });
        }
      });
    });

    // Subtract penalties
    if (this.db.penalties) {
      this.db.penalties.forEach(pen => {
        const team = this.db.teams.find(t => t.id === pen.teamId);
        if (team) {
          team.totalScore -= (parseInt(pen.points) || 0);
        }
      });
    }

    // Calculate Ranks (highest score gets rank 1; ties share the same rank, next rank skips)
    const sortedTeams = [...this.db.teams].sort((a, b) => b.totalScore - a.totalScore);
    let lastScore = null;
    let lastRank = 0;
    sortedTeams.forEach((t, idx) => {
      const team = this.db.teams.find(orig => orig.id === t.id);
      if (lastScore !== null && team.totalScore === lastScore) {
        team.rank = lastRank;
      } else {
        team.rank = idx + 1;
        lastRank = team.rank;
        lastScore = team.totalScore;
      }
    });
  }

  // Team points for one or more categories (e.g. ["Sub Junior","Junior"]), ranked
  // Returns ALL teams (including 0-point) so the standings are always complete
  getCategoryTeamPoints(categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    const teamPoints = {};
    this.db.teams.forEach(t => { teamPoints[t.id] = { team: t, points: 0 }; });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || !cats.includes(prog.category)) return;

      prog.results.forEach(res => {
        let team = null;
        if (prog.category === 'General') {
          team = this.db.teams.find(t => t.id === (res.teamId || prog.teamId));
        } else {
          const student = this.db.students.find(s => s.id === res.studentId);
          if (!student) return;
          team = this.db.teams.find(t => t.id === student.teamId);
        }
        if (!team || !teamPoints[team.id]) return;
        teamPoints[team.id].points += this.programmePoints(prog, res.rank, res.grade);
      });
    });

    // Subtract category-specific penalties
    if (this.db.penalties) {
      this.db.penalties.forEach(pen => {
        const prog = this.db.programmes.find(p => p.id === pen.programmeId);
        if (prog && cats.includes(prog.category)) {
          if (teamPoints[pen.teamId]) {
            teamPoints[pen.teamId].points -= (parseInt(pen.points) || 0);
          }
        }
      });
    }

    const list = Object.values(teamPoints);
    list.sort((a, b) => b.points - a.points);
    let lastPts = null;
    let lastRank = 0;
    list.forEach((item, idx) => {
      if (lastPts !== null && item.points === lastPts) {
        item.rank = lastRank;
      } else {
        item.rank = idx + 1;
        lastRank = item.rank;
        lastPts = item.points;
      }
    });
    return list;
  }

  // CRUD Penalties / Minus Marks
  addPenalty(programmeId, teamId, points, reason) {
    const id = "pen-" + Date.now();
    this.db.penalties = this.db.penalties || [];
    this.db.penalties.push({ id, programmeId, teamId, points: parseInt(points) || 0, reason });
    this.save(false, 'penalties');
    this.calculateLeaderboard();
    return id;
  }

  deletePenalty(id) {
    if (this.db.penalties) {
      this.db.penalties = this.db.penalties.filter(p => p.id !== id);
      this.save(false, 'penalties');
      this.calculateLeaderboard();
    }
  }

  // Calculate Kalaprathibha (Arts Champion)
  // Highest point-scoring student in individual events for each category
  getKalaprathibha(category) {
    const studentPoints = {};

    this.db.students.forEach(s => {
      if (s.category === category) {
        studentPoints[s.id] = { student: s, points: 0, rank1Count: 0, gradeACount: 0 };
      }
    });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || prog.category !== category) return;

      prog.results.forEach(res => {
        if (studentPoints[res.studentId]) {
          const pts = this.programmePoints(prog, res.rank, res.grade);
          studentPoints[res.studentId].points += pts;
          if (res.rank === 1) studentPoints[res.studentId].rank1Count++;
          if (res.grade === 'A') studentPoints[res.studentId].gradeACount++;
        }
      });
    });

    const list = Object.values(studentPoints).filter(item => item.points > 0);
    
    // Sort by points desc, then rank1Count desc, then gradeACount desc
    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.rank1Count !== a.rank1Count) return b.rank1Count - a.rank1Count;
      return b.gradeACount - a.gradeACount;
    });

    if (list.length > 0) {
      const top = list[0];
      const team = this.db.teams.find(t => t.id === top.student.teamId);
      return {
        student: top.student,
        points: top.points,
        teamName: team ? team.name : "Unknown Team"
      };
    }

    // Default mock placeholder if no results published
    const firstCatStudent = this.db.students.find(s => s.category === category);
    const team = firstCatStudent ? this.db.teams.find(t => t.id === firstCatStudent.teamId) : null;
    return {
      student: firstCatStudent || { name: "No Active Student", photo: "" },
      points: 0,
      teamName: team ? team.name : "N/A"
    };
  }

  // Top 3 Kalaprathibha contenders for a category (1st, 2nd, 3rd)
  getKalaprathibhaTop3(category) {
    const studentPoints = {};

    this.db.students.forEach(s => {
      if (s.category === category) {
        studentPoints[s.id] = { student: s, points: 0, rank1Count: 0, gradeACount: 0 };
      }
    });

    this.db.programmes.forEach(prog => {
      if (!prog.resultsPublished || prog.category !== category) return;

      prog.results.forEach(res => {
        if (studentPoints[res.studentId]) {
          const pts = this.programmePoints(prog, res.rank, res.grade);
          studentPoints[res.studentId].points += pts;
          if (res.rank === 1) studentPoints[res.studentId].rank1Count++;
          if (res.grade === 'A') studentPoints[res.studentId].gradeACount++;
        }
      });
    });

    const list = Object.values(studentPoints).filter(item => item.points > 0);

    list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.rank1Count !== a.rank1Count) return b.rank1Count - a.rank1Count;
      return b.gradeACount - a.gradeACount;
    });

    return list.slice(0, 3).map(item => {
      const team = this.db.teams.find(t => t.id === item.student.teamId);
      return {
        student: item.student,
        points: item.points,
        teamName: team ? team.name : "Unknown Team"
      };
    });
  }

  // Get student profile and program participations
  getStudentProfile(studentId) {
    const student = this.db.students.find(s => s.id === studentId);
    if (!student) return null;

    const team = this.db.teams.find(t => t.id === student.teamId);
    const participations = [];
    let totalScore = 0;
    let rankCount = { 1: 0, 2: 0, 3: 0 };
    let gradeCount = { A: 0, B: 0, C: 0 };

    this.db.programmes.forEach(prog => {
      if (prog.category !== student.category) return;

      const result = prog.results.find(r => r.studentId === studentId);
      if (result) {
        const pts = this.programmePoints(prog, result.rank, result.grade);
        totalScore += pts;
        if (result.rank) rankCount[result.rank]++;
        if (result.grade) gradeCount[result.grade]++;

        participations.push({
          programmeId: prog.id,
          programmeName: prog.name,
          venue: prog.venue,
          rank: result.rank,
          grade: result.grade,
          points: pts,
          published: prog.resultsPublished
        });
      }
    });

    // Sort student's own participations: Rank 1 -> Rank 2 -> Rank 3 -> Grade A -> Grade B -> Grade C
    participations.sort((a, b) => {
      const aRank = a.rank ? Number(a.rank) : 999;
      const bRank = b.rank ? Number(b.rank) : 999;
      if (aRank !== bRank) return aRank - bRank;
      const gw = g => g === 'A' ? 3 : g === 'B' ? 2 : g === 'C' ? 1 : 0;
      const gDiff = gw(b.grade) - gw(a.grade);
      if (gDiff !== 0) return gDiff;
      return (b.points || 0) - (a.points || 0);
    });

    // Calculate Overall Rank among students in the same category (Rank first, then Grade)
    const catStudents = this.db.students.filter(s => s.category === student.category);
    const scores = catStudents.map(s => {
      let score = 0;
      let r1 = 0, r2 = 0, r3 = 0, gA = 0, gB = 0;
      this.db.programmes.forEach(prog => {
        if (prog.category === s.category && prog.resultsPublished) {
          const res = prog.results.find(r => r.studentId === s.id);
          if (res) {
            score += this.programmePoints(prog, res.rank, res.grade);
            if (res.rank === 1) r1++;
            if (res.rank === 2) r2++;
            if (res.rank === 3) r3++;
            if (res.grade === 'A') gA++;
            if (res.grade === 'B') gB++;
          }
        }
      });
      return { id: s.id, score, r1, r2, r3, gA, gB };
    }).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.r1 !== a.r1) return b.r1 - a.r1;
      if (b.r2 !== a.r2) return b.r2 - a.r2;
      if (b.r3 !== a.r3) return b.r3 - a.r3;
      if (b.gA !== a.gA) return b.gA - a.gA;
      return b.gB - a.gB;
    });

    const pos = scores.findIndex(s => s.id === studentId) + 1;

    return {
      ...student,
      teamName: team ? team.name : "Unknown",
      participations,
      totalScore,
      rankCount,
      gradeCount,
      position: pos
    };
  }

  // Search students by name
  searchStudents(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return this.db.students.filter(s => s.name.toLowerCase().includes(q)).map(s => {
      const team = this.db.teams.find(t => t.id === s.teamId);
      return {
        ...s,
        teamName: team ? team.name : "Unknown"
      };
    });
  }

  // CRUD Teams
  // Ensure every roster member (and captain) also exists as a student (unassigned category)
  syncRosterToStudents(teamId, names) {
    const existing = this.db.students.filter(s => s.teamId === teamId);
    names.forEach(raw => {
      const name = (raw || "").trim();
      if (!name) return;
      const found = existing.find(s => (s.name || "").trim().toLowerCase() === name.toLowerCase());
      if (!found) {
        const id = "stud-" + (Date.now()) + "-" + Math.floor(Math.random() * 1000);
        this.db.students.push({ id, name, teamId, category: "", photo: "" });
      }
    });
  }

  addTeam(name, captain, viceCaptain, members = []) {
    const id = "team-" + (Date.now());
    this.db.teams.push({ id, name, captain, viceCaptain: viceCaptain || "", members, totalScore: 0, rank: this.db.teams.length + 1, grades: { A: 0, B: 0, C: 0 }, wins: [] });
    this.syncRosterToStudents(id, [captain, viceCaptain, ...members]);
    this.save(false, 'teams');
    this.save(false, 'students');
    this.calculateLeaderboard();
    return id;
  }

  editTeam(id, name, captain, viceCaptain, members = []) {
    const team = this.db.teams.find(t => t.id === id);
    if (team) {
      team.name = name;
      team.captain = captain;
      team.viceCaptain = viceCaptain || "";
      team.members = members;
      this.syncRosterToStudents(team.id, [captain, viceCaptain, ...members]);
      this.save(false, 'teams');
      this.save(false, 'students');
      this.calculateLeaderboard();
    }
  }

  deleteTeam(id) {
    this.db.teams = this.db.teams.filter(t => t.id !== id);
    // Also update any students who were in this team
    this.db.students.forEach(s => {
      if (s.teamId === id) s.teamId = "";
    });
    this.save(false, 'teams');
    this.save(false, 'students');
    this.calculateLeaderboard();
  }

  // CRUD Students
  addStudent(name, teamId, category, photo = "") {
    const id = "stud-" + (Date.now());
    this.db.students.push({ id, name, teamId, category, photo });
    this.save(false, 'students');
    this.calculateLeaderboard();
    return id;
  }

  editStudent(id, name, teamId, category, photo = "") {
    const student = this.db.students.find(s => s.id === id);
    if (student) {
      student.name = name;
      student.teamId = teamId;
      student.category = category;
      if (photo) student.photo = photo;
      this.save(false, 'students');
      this.calculateLeaderboard();
    }
  }

  deleteStudent(id) {
    this.db.students = this.db.students.filter(s => s.id !== id);
    // Also remove from any programme results
    this.db.programmes.forEach(prog => {
      prog.results = prog.results.filter(res => res.studentId !== id);
    });
    this.save(false, 'students');
    this.save(false, 'programmes');
    this.calculateLeaderboard();
  }

  // CRUD Programmes
  addProgramme(name, category, type, teamId) {
    const id = "prog-" + (Date.now());
    this.db.programmes.push({ id, name, category, type: type || "individual", teamId: teamId || "", resultsPublished: false, results: [] });
    this.save(false, 'programmes');
    return id;
  }

  editProgramme(id, name, category, type, teamId) {
    const prog = this.db.programmes.find(p => p.id === id);
    if (prog) {
      prog.name = name;
      prog.category = category;
      prog.type = (prog.category === 'General') ? 'group' : (type || prog.type || "individual");
      prog.teamId = teamId || "";
      this.save(false, 'programmes');
      this.calculateLeaderboard();
    }
  }

  deleteProgramme(id) {
    this.db.programmes = this.db.programmes.filter(p => p.id !== id);
    this.save(false, 'programmes');
    this.calculateLeaderboard();
  }

  // Publish Results
  publishResults(programmeId, resultsArray) {
    const prog = this.db.programmes.find(p => p.id === programmeId);
    if (prog) {
      prog.results = resultsArray.map(r => ({
        rank: r.rank ? parseInt(r.rank) : null,
        studentId: r.studentId || null,
        teamId: (prog.category === 'General') ? (r.teamId || null) : null,
        grade: r.grade ? r.grade.toUpperCase().trim() : null
      }));
      prog.resultsPublished = true;
      prog.resultsPublishedAt = new Date().toISOString();
      this.save(false, 'programmes');
      this.calculateLeaderboard();

      // Trigger automatic announcement notification
      const dateStr = new Date().toISOString();
      this.addNotification(`${prog.name} (${prog.category}) Results Published`, `The results for the program "${prog.name}" under category "${prog.category}" have been officially published. Check the results portal for details.`, "success");
    }
  }

  unpublishResults(programmeId) {
    const prog = this.db.programmes.find(p => p.id === programmeId);
    if (prog) {
      prog.results = [];
      prog.resultsPublished = false;
      delete prog.resultsPublishedAt;
      this._allowUnpublishAll = true;
      this.calculateLeaderboard();
      this.save(true, 'programmes');
    }
  }

  unpublishAllResults() {
    this.db.programmes.forEach(prog => {
      prog.results = [];
      prog.resultsPublished = false;
      delete prog.resultsPublishedAt;
    });
    this._allowUnpublishAll = true;
    this.save(true, 'programmes');
    this.calculateLeaderboard();
  }

  // Notifications
  addNotification(title, content, type = "info") {
    const id = "notif-" + (Date.now());
    this.db.notifications.unshift({ id, title, content, type, date: new Date().toISOString() });
    // Limit to latest 30 notifications
    if (this.db.notifications.length > 30) this.db.notifications.pop();
    this.save(false, 'notifications');
    return id;
  }

  deleteNotification(id) {
    this.db.notifications = this.db.notifications.filter(n => n.id !== id);
    this.save(false, 'notifications');
  }

  // Appeals
  addAppeal(studentName, team, category, programme, phoneNumber, description) {
    const id = "appl-" + (Date.now());
    this.db.appeals.unshift({
      id,
      studentName,
      team,
      category,
      programme,
      phoneNumber,
      description,
      fee: 50,
      status: "Pending",
      response: "",
      date: new Date().toISOString()
    });
    this.save(false, 'appeals');
    return id;
  }

  respondToAppeal(id, status, responseText) {
    const appeal = this.db.appeals.find(a => a.id === id);
    if (appeal) {
      appeal.status = status;
      appeal.response = responseText;
      this.save(false, 'appeals');

      // Notify public channel
      const type = status === 'Approved' ? 'success' : 'danger';
      this.addNotification(`Appeal Update: ${appeal.programme}`, `Appeal submitted by ${appeal.studentName} (${appeal.team}) for "${appeal.programme}" has been ${status.toLowerCase()}. Response: ${responseText}`, type);
    }
  }

  // Media & Social Embeds (YouTube, Instagram, Video, Image)
  parseMedia(url, explicitType = "") {
    if (!url) return { type: 'image', url: '', embedUrl: '', thumbnailUrl: '', rawUrl: '' };

    const cleanUrl = url.trim();

    // YouTube detection (Standard, Shorts, youtu.be, embed)
    const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1];
      return {
        type: 'youtube',
        videoId: videoId,
        url: cleanUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&enablejsapi=1&playsinline=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        rawUrl: cleanUrl
      };
    }

    // Instagram detection (Reel, Post, TV)
    const igMatch = cleanUrl.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([^"&?\/\s]+)/i);
    if (igMatch && igMatch[1]) {
      const code = igMatch[1];
      return {
        type: 'instagram',
        code: code,
        url: cleanUrl,
        embedUrl: `https://www.instagram.com/reel/${code}/embed/captioned/`,
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop',
        rawUrl: cleanUrl
      };
    }

    // Direct Video (MP4 / WebM / OGG / MOV)
    if (explicitType === 'video' || cleanUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || cleanUrl.includes('/mov_bbb.mp4')) {
      return {
        type: 'video',
        url: cleanUrl,
        embedUrl: cleanUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
        rawUrl: cleanUrl
      };
    }

    // Image / Photo
    return {
      type: explicitType || 'image',
      url: cleanUrl,
      embedUrl: cleanUrl,
      thumbnailUrl: cleanUrl,
      rawUrl: cleanUrl
    };
  }

  addMedia(type, title, url, day, category, event) {
    const id = "gal-" + (Date.now());
    const parsed = this.parseMedia(url, type);
    const resolvedType = (type === 'image' && url.startsWith('data:image')) ? 'image' : (parsed.type || type);

    this.db.gallery.unshift({ 
      id, 
      type: resolvedType, 
      title, 
      url, 
      day, 
      category, 
      event 
    });
    this.save(false, 'gallery');
    return id;
  }

  deleteMedia(id) {
    this.db.gallery = this.db.gallery.filter(g => g.id !== id);
    this.save(false, 'gallery');
  }

  // Prospectus & Contacts
  updateProspectus(base64Data) {
    this.db.settings.prospectusUrl = base64Data;
    this.save(false, 'settings');
  }

  updateContact(details) {
    this.db.contact = { ...this.db.contact, ...details };
    this.save(false, 'contact');
  }

  // Contact Messages from public users
  addContactMessage(name, email, message, phone = "") {
    if (!Array.isArray(this.db.messages)) this.db.messages = [];
    const id = "msg-" + Date.now();
    this.db.messages.unshift({
      id,
      name,
      email,
      phone,
      message,
      read: false,
      date: new Date().toISOString()
    });
    this.save(false, 'messages');
    return id;
  }

  markMessageAsRead(id, readStatus = true) {
    if (!Array.isArray(this.db.messages)) return;
    const msg = this.db.messages.find(m => m.id === id);
    if (msg) {
      msg.read = readStatus;
      this.save(false, 'messages');
    }
  }

  deleteMessage(id) {
    if (!Array.isArray(this.db.messages)) return;
    this.db.messages = this.db.messages.filter(m => m.id !== id);
    this.save(false, 'messages');
  }

  updateSettings(settings) {
    this.db.settings = { ...this.db.settings, ...settings };
    this.save(false, 'settings');
  }
}

// Instantiate database globally
const ThanafusDB = new Database();
window.ThanafusDB = ThanafusDB;
