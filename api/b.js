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
    res.send(page("TOP BREEDERS", rows));
};

function page(title, rows) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#111;color:#fc0;font-family:'Courier New',monospace;padding:8px}
h1{font-size:16px;color:#fff;border-bottom:2px solid #fc0;padding-bottom:5px;margin-bottom:6px;text-align:center;letter-spacing:2px}
table{width:100%;border-collapse:collapse;font-size:14px}
th{color:#666;font-size:10px;text-align:left;padding:2px 3px;border-bottom:1px solid #333}
td{padding:3px;border-bottom:1px solid #1a1a1a}
.r{color:#888;width:20px}.n{color:#fc0}.l{color:#0f0;text-align:right;font-weight:bold}
.empty{color:#555;font-style:italic;text-align:center;padding:15px}
tr:hover td{background:#1a1a1a}
</style></head><body>
<h1>${title}</h1>
<table><tr><th>#</th><th>Name</th><th>Lvl</th></tr>${rows}</table>
</body></html>`;
}

function esc(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
