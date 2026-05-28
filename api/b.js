module.exports = (req, res) => {
    const raw = req.query.d || "";
    const isUpdating = raw === "Updating~0" || raw === "";

    const entries = !isUpdating
        ? raw.split("|").map((e, i) => {
            const parts = e.split("~");
            return {
                rank: i + 1,
                name: (parts[0] || "???").replace(/_/g, " "),
                level: parseInt(parts[1]) || 0
            };
        })
        : [];

    const rows = isUpdating
        ? '<tr><td colspan="3" class="updating">Updating...</td></tr>'
        : entries.length
            ? entries.map(e => '<tr><td class="r">' + e.rank + '</td><td class="n">' + esc(e.name) + '</td><td class="l">' + e.level + '</td></tr>').join("")
            : '<tr><td colspan="3" class="empty">No players</td></tr>';

    res.setHeader("Content-Type", "text/html");
    res.send(page("TOP GIVERS", rows));
};

function page(title, rows) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8">'
        + '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">'
        + '<style>'
        + '*{margin:0;padding:0;box-sizing:border-box}'
        + 'body{background:#0d0d0d;color:#fc0;font-family:"Open Sans",sans-serif;padding:14px}'
        + 'h1{font-size:28px;font-weight:700;color:#fff;letter-spacing:3px;text-transform:uppercase;border-bottom:2px solid #fc0;padding-bottom:8px;margin-bottom:12px;text-align:center}'
        + 'table{width:100%;border-collapse:collapse;font-size:22px}'
        + 'th{color:#555;font-size:14px;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-align:left;padding:4px 6px;border-bottom:1px solid #222}'
        + 'td{padding:7px 6px;border-bottom:1px solid #1a1a1a}'
        + '.r{color:#444;width:32px;font-weight:600}'
        + '.n{color:#fc0;font-weight:600}'
        + '.l{color:#0f0;text-align:right;font-weight:700}'
        + '.empty{color:#444;font-style:italic;text-align:center;padding:20px;font-size:20px}'
        + '.updating{color:#888;text-align:center;padding:20px;font-size:20px}'
        + 'tr:hover td{background:#161616}'
        + '</style></head><body>'
        + '<h1>' + title + '</h1>'
        + '<table><tr><th>#</th><th>Name</th><th style="text-align:right">Level</th></tr>' + rows + '</table>'
        + '</body></html>';
}

function esc(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
