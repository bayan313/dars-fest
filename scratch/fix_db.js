const fs = require('fs');
let code = fs.readFileSync('js/db.js', 'utf8');

// Replace in publishResults, unpublishResults, unpublishAllResults
code = code.replace(/this\.calculateLeaderboard\(\);\s+this\.save\(false, 'programmes'\);/g, 
  "this.calculateLeaderboard();\n        this.save(false, 'programmes');\n        this.save(false, 'teams');\n        this.save(false, 'students');");

fs.writeFileSync('js/db.js', code);
console.log('Fixed save logic to persist teams and students scores');
