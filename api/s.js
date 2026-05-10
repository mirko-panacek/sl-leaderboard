module.exports = (req, res) => {
    const raw = req.query.d || "";
    const entries = raw
        ? raw.split("|").map((e, i) => {
            const parts = e.split("~");
            return {
                rank: i + 1,
                name: (parts[0] || "???").replace(/_/g, " "),
                level: parseInt(parts[1]) || 0
            };
        })
        : [];

    const rows = entries.length
        ? entries.map(e => `<tr><td class="r">${e.rank}</td><td class="n">${esc(e.name)}</td><td class="l">${e.level}</td></tr>`).join("")
        : `<tr><td colspan="3" class="empty">No players</td></tr>`;

    res.setHeader("Content-Type", "text/html");
    res.send(page("TOP SLUTS", rows));
};

function page(title, rows) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d0d;color:#fc0;font-family:'Exo 2',sans-serif;padding:10px}
h1{font-size:15px;font-weight:700;color:#fff;letter-spacing:3px;text-transform:uppercase;
   border-bottom:1px solid #fc0;padding-bottom:6px;margin-bottom:8px;text-align:center}
table{width:100%;border-collapse:collapse;font-size:13px}
th{color:#555;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;
   text-align:left;padding:3px 4px;border-bottom:1px solid #222}
td{padding:4px 4px;border-bottom:1px solid #1a1a1a}
.r{color:#444;width:22px;font-weight:600}
.n{color:#fc0;font-weight:600}
.l{color:#0f0;text-align:right;font-weight:700}
.empty{color:#444;font-style:italic;text-align:center;padding:20px}
tr:hover td{background:#161616}
</style></head><body>
<h1>${title}</h1>
<table><tr><th>#</th><th>Name</th><th>Lvl</th></tr>${rows}</table>
</body></html>`;
}

function esc(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
