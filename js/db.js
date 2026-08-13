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
    { id: "prog-1", name: "Quran Recitation", category: "Sub Junior", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: true, results: [{ rank: 1, studentId: "stud-1", grade: "A" }, { rank: 2, studentId: "stud-2", grade: "A" }, { rank: 3, studentId: "stud-3", grade: "B" }] },
    { id: "prog-2", name: "Speech", category: "Sub Junior", venue: "Imam Bukhari Stage", judge: "Usthad Faisal Ahsani", resultsPublished: true, results: [{ rank: 1, studentId: "stud-4", grade: "A" }, { rank: 2, studentId: "stud-1", grade: "B" }, { rank: 3, studentId: "stud-2", grade: "B" }] },
    { id: "prog-3", name: "Mappilappattu", category: "Sub Junior", venue: "Imam Malik Stage", judge: "Usthad Salim Darimi", resultsPublished: false, results: [] },
    
    { id: "prog-4", name: "Quran Recitation", category: "Junior", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: true, results: [{ rank: 1, studentId: "stud-5", grade: "A" }, { rank: 2, studentId: "stud-6", grade: "A" }, { rank: 3, studentId: "stud-7", grade: "B" }] },
    { id: "prog-5", name: "Quiz", category: "Junior", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: true, results: [{ rank: 1, studentId: "stud-8", grade: "A" }, { rank: 2, studentId: "stud-5", grade: "A" }, { rank: 3, studentId: "stud-6", grade: "B" }] },
    { id: "prog-6", name: "Essay Writing", category: "Junior", venue: "Class Room 4", judge: "Usthad Abdul Rasheed", resultsPublished: false, results: [] },

    { id: "prog-7", name: "Speech", category: "Senior", venue: "Imam Malik Stage", judge: "Usthad Faisal Ahsani", resultsPublished: true, results: [{ rank: 1, studentId: "stud-9", grade: "A" }, { rank: 2, studentId: "stud-10", grade: "B" }, { rank: 3, studentId: "stud-11", grade: "B" }] },
    { id: "prog-8", name: "Quiz", category: "Senior", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: true, results: [{ rank: 1, studentId: "stud-12", grade: "A" }, { rank: 2, studentId: "stud-9", grade: "A" }, { rank: 3, studentId: "stud-10", grade: "B" }] },
    { id: "prog-9", name: "Story Writing", category: "Senior", venue: "Class Room 5", judge: "Usthad Najeeb Hudawi", resultsPublished: false, results: [] }
  ],
  notifications: [
    { id: "notif-1", title: "Quran Recitation Results Published", content: "Quran Recitation results for Sub Junior, Junior, and Senior categories are now available online.", type: "success", date: "2026-07-03T10:00:00Z" },
    { id: "notif-2", title: "Appeal Panel Active", content: "All appeals regarding published results must be submitted within 1 hour of the official announcement.", type: "warning", date: "2026-07-03T11:30:00Z" },
    { id: "notif-3", title: "Venue Change for Senior Quiz", content: "Senior Quiz will be held at Imam Malik Stage instead of Stage B. Time remains 02:00 PM.", type: "info", date: "2026-07-03T13:00:00Z" }
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
  settings: {
    prospectusUrl: "", // Base64 or standard URL
    adminPassword: "admin@9526"
  }
};

class Database {
  constructor() {
    this.load();
    this.calculateLeaderboard();
  }

  load() {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/all', false); // Synchronous request to ensure data is loaded before rendering
      xhr.send(null);
      if (xhr.status === 200) {
        this.db = JSON.parse(xhr.responseText);
      } else {
        throw new Error('Failed to load data from API');
      }
    } catch (e) {
      // No local fallback: data lives only on the server (MongoDB).
      console.error("Database loading from API failed", e);
      this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
    }
  }

  save(isReset) {
    const payload = Object.assign({}, this.db);
    if (isReset) payload.reset = true;
    fetch('/api/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        this.db = data;
        console.log('Database synchronized with server');
      })
      .catch(e => console.error('Failed to save to API', e));
  }

  reset() {
    this.db = JSON.parse(JSON.stringify(DEFAULT_DB));
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

    // Calculate Ranks (highest score gets rank 1)
    const sortedTeams = [...this.db.teams].sort((a, b) => b.totalScore - a.totalScore);
    sortedTeams.forEach((t, idx) => {
      const team = this.db.teams.find(orig => orig.id === t.id);
      team.rank = idx + 1;
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

    const list = Object.values(teamPoints);
    list.sort((a, b) => b.points - a.points);
    list.forEach((item, idx) => { item.rank = idx + 1; });
    return list;
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

    // Calculate Overall Rank among students in the same category
    const catStudents = this.db.students.filter(s => s.category === student.category);
    const scores = catStudents.map(s => {
      let score = 0;
      this.db.programmes.forEach(prog => {
        if (prog.category === s.category) {
          const res = prog.results.find(r => r.studentId === s.id);
          if (res) score += this.calculatePoints(res.rank, res.grade);
        }
      });
      return { id: s.id, score };
    }).sort((a, b) => b.score - a.score);

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
    this.save();
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
      this.save();
      this.calculateLeaderboard();
    }
  }

  deleteTeam(id) {
    this.db.teams = this.db.teams.filter(t => t.id !== id);
    // Also update any students who were in this team
    this.db.students.forEach(s => {
      if (s.teamId === id) s.teamId = "";
    });
    this.save();
    this.calculateLeaderboard();
  }

  // CRUD Students
  addStudent(name, teamId, category, photo = "") {
    const id = "stud-" + (Date.now());
    this.db.students.push({ id, name, teamId, category, photo });
    this.save();
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
      this.save();
      this.calculateLeaderboard();
    }
  }

  deleteStudent(id) {
    this.db.students = this.db.students.filter(s => s.id !== id);
    // Also remove from any programme results
    this.db.programmes.forEach(prog => {
      prog.results = prog.results.filter(res => res.studentId !== id);
    });
    this.save();
    this.calculateLeaderboard();
  }

  // CRUD Programmes
  addProgramme(name, category, type, teamId) {
    const id = "prog-" + (Date.now());
    this.db.programmes.push({ id, name, category, type: type || "individual", teamId: teamId || "", resultsPublished: false, results: [] });
    this.save();
    return id;
  }

  editProgramme(id, name, category, type, teamId) {
    const prog = this.db.programmes.find(p => p.id === id);
    if (prog) {
      prog.name = name;
      prog.category = category;
      prog.type = (prog.category === 'General') ? 'group' : (type || prog.type || "individual");
      prog.teamId = teamId || "";
      this.save();
      this.calculateLeaderboard();
    }
  }

  deleteProgramme(id) {
    this.db.programmes = this.db.programmes.filter(p => p.id !== id);
    this.save();
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
      this.save();
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
      this.save();
      this.calculateLeaderboard();
    }
  }

  // Notifications
  addNotification(title, content, type = "info") {
    const id = "notif-" + (Date.now());
    this.db.notifications.unshift({ id, title, content, type, date: new Date().toISOString() });
    // Limit to latest 30 notifications
    if (this.db.notifications.length > 30) this.db.notifications.pop();
    this.save();
    return id;
  }

  deleteNotification(id) {
    this.db.notifications = this.db.notifications.filter(n => n.id !== id);
    this.save();
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
      status: "Pending",
      response: "",
      date: new Date().toISOString()
    });
    this.save();
    return id;
  }

  respondToAppeal(id, status, responseText) {
    const appeal = this.db.appeals.find(a => a.id === id);
    if (appeal) {
      appeal.status = status;
      appeal.response = responseText;
      this.save();

      // Notify public channel
      const type = status === 'Approved' ? 'success' : 'danger';
      this.addNotification(`Appeal Update: ${appeal.programme}`, `Appeal submitted by ${appeal.studentName} (${appeal.team}) for "${appeal.programme}" has been ${status.toLowerCase()}. Response: ${responseText}`, type);
    }
  }

  // Media
  addMedia(type, title, url, day, category, event) {
    const id = "gal-" + (Date.now());
    this.db.gallery.unshift({ id, type, title, url, day, category, event });
    this.save();
    return id;
  }

  deleteMedia(id) {
    this.db.gallery = this.db.gallery.filter(g => g.id !== id);
    this.save();
  }

  // Prospectus & Contacts
  updateProspectus(base64Data) {
    this.db.settings.prospectusUrl = base64Data;
    this.save();
  }

  updateContact(details) {
    this.db.contact = { ...this.db.contact, ...details };
    this.save();
  }

  updateSettings(settings) {
    this.db.settings = { ...this.db.settings, ...settings };
    this.save();
  }
}

// Instantiate database globally
const ThanafusDB = new Database();
window.ThanafusDB = ThanafusDB;
