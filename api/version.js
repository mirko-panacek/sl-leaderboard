// Version-check data for the BreedLust HUD Server prims and the Update
// Dispatcher. Edit the values below and redeploy whenever you release a
// new version, or when the Update Dispatcher's address changes.
const DATA = {
    combined: {
        version: "2.00",     // current released version of the Combined HUD Server package
        note: "Server config added"             // optional short changelog line shown to club owners
    },
    domsub: {
        version: "2.00",     // current released version of the Dom Sub HUD Server package
        note: "Server config added"
    },
    // Paste the address the Update Dispatcher announces via llOwnerSay
    // (format: "<key>@lsl.secondlife.com"). Leave blank if no Dispatcher
    // is running yet — Server prims will just skip the delivery request.
    dispatcher_email: "df2f6c63-c155-9c58-9303-096593ca3e99@lsl.secondlife.com"
};

module.exports = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(DATA));
};
