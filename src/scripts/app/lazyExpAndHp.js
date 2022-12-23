const signCase = {
    add: "+",
    subtract: "-",
    equals: "=",
    default: " ",
};
function _onChangeExp(ev) {
    const input = ev.target;
    const actor = ev.data.app.actor;
    const sheet = ev.data.app.options;
    const exp = ev.data.app.actor.system.details.xp.value;
    const maxExp = ev.data.app.actor.system.details.xp.max;
    const minExp = ev.data.app.actor.system.details.xp.min;
    const denom = input.name.split(".")[2];
    const value = input.value;
    let sign = signCase.default;
    Object.values(signCase).forEach((val) => {
        if (value.includes(val)) {
            sign = val;
        }
    });
    const splitVal = value.split(sign);
    let delta;
    if (splitVal.length > 1) {
        delta = Number(splitVal[1]);
    }
    else {
        delta = Number(splitVal[0]);
    }
    let newAmount = {};

    switch (sign) {
        case signCase.add: {
            newAmount = Number(exp) + delta;
            break;
        }
        case signCase.subtract: {
            newAmount = Number(exp) - delta;
            break;
        }
        case signCase.equals: {
            newAmount = delta;
            break;
        }
        default: {
            newAmount = delta;
            break;
        }
    }

    if(newAmount > maxExp) {
        newAmount = maxExp;
    }
    if(newAmount <  minExp) {
        newAmount = minExp;
    }
    
    sheet.submitOnChange = false;
    actor
        .update({ "system.details.xp.value": newAmount })
        .then(() => {
        input.value = getProperty(actor.data, input.name);
        sheet.submitOnChange = true;
    })
    .catch(console.log.bind(console));
    
}

function _onChangeHp(ev) {
    const input = ev.target;
    const actor = ev.data.app.actor;
    const sheet = ev.data.app.options;
    const hp = ev.data.app.actor.system.attributes.hp.value;
    const maxHp = ev.data.app.actor.system.attributes.hp.max;
    const minHp = ev.data.app.actor.system.attributes.hp.min;
    const denom = input.name.split(".")[2];
    const value = input.value;
    let sign = signCase.default;
    Object.values(signCase).forEach((val) => {
        if (value.includes(val)) {
            sign = val;
        }
    });
    const splitVal = value.split(sign);
    let delta;
    if (splitVal.length > 1) {
        delta = Number(splitVal[1]);
    }
    else {
        delta = Number(splitVal[0]);
    }
    let newAmount = {};

    switch (sign) {
        case signCase.add: {
            newAmount = Number(hp) + delta;
            break;
        }
        case signCase.subtract: {
            newAmount = Number(hp) - delta;
            break;
        }
        case signCase.equals: {
            newAmount = delta;
            break;
        }
        default: {
            newAmount = delta;
            break;
        }
    }

    if(newAmount > maxHp) {
        newAmount = maxHp;
    }
    if(newAmount <  minHp) {
        newAmount = minHp;
    }
    
    sheet.submitOnChange = false;
    actor
        .update({ "system.attributes.hp.value": newAmount })
        .then(() => {
        input.value = getProperty(actor.data, input.name);
        sheet.submitOnChange = true;
    })
    .catch(console.log.bind(console));
    
}

function _onChangeHpMax(ev) {
    const input = ev.target;
    const actor = ev.data.app.actor;
    const sheet = ev.data.app.options;
    const hp = ev.data.app.actor.system.attributes.hp.value;
    const maxHp = ev.data.app.actor.system.attributes.hp.max;
    const minHp = ev.data.app.actor.system.attributes.hp.min;
    const denom = input.name.split(".")[2];
    const value = input.value;
    let sign = signCase.default;
    Object.values(signCase).forEach((val) => {
        if (value.includes(val)) {
            sign = val;
        }
    });
    const splitVal = value.split(sign);
    let delta;
    if (splitVal.length > 1) {
        delta = Number(splitVal[1]);
    }
    else {
        delta = Number(splitVal[0]);
    }
    let newAmount = {};

    switch (sign) {
        case signCase.add: {
            newAmount = Number(maxHp) + delta;
            break;
        }
        case signCase.subtract: {
            newAmount = Number(maxHp) - delta;
            break;
        }
        case signCase.equals: {
            newAmount = delta;
            break;
        }
        default: {
            newAmount = delta;
            break;
        }
    }

    // if(newAmount > maxHp) {
    //     newAmount = maxHp;
    // }
    if(newAmount <  minHp) {
        newAmount = minHp;
    }
    
    sheet.submitOnChange = false;
    actor
        .update({ "system.attributes.hp.max": newAmount })
        .then(() => {
        input.value = getProperty(actor.data, input.name);
        sheet.submitOnChange = true;
    })
    .catch(console.log.bind(console));
    
}

export function applyLazyExp(app, html, actorData) {
    // if (!game.settings.get('tidy5e-sheet', "lazyExpEnable")) {
    //     return;
    // }
    for (const elem of html.find("input[name^='system.details.xp.value']")) {
        elem.type = "text";
        elem.classList.add("lazyexp");
    }
    html.find("input[name^='system.details.xp.value']").off("change");
    html.find("input[name^='system.details.xp.value']").change({
        app: app,
        data: actorData,
    }, _onChangeExp);
}

export function applyLazyHp(app, html, actorData) {
    // if (!game.settings.get('tidy5e-sheet', "lazyHpEnable")) {
    //     return;
    // }
    for (const elem of html.find("input[name^='system.attributes.hp.value']")) {
        elem.type = "text";
        elem.classList.add("lazyhp");
    }
    html.find("input[name^='system.attributes.hp.value']").off("change");
    html.find("input[name^='system.attributes.hp.value']").change({
        app: app,
        data: actorData,
    }, _onChangeHp);

    for (const elem of html.find("input[name^='system.attributes.hp.max']")) {
        elem.type = "text";
        elem.classList.add("lazyhp");
    }
    html.find("input[name^='system.attributes.hp.max']").off("change");
    html.find("input[name^='system.attributes.hp.max']").change({
        app: app,
        data: actorData,
    }, _onChangeHpMax);

    
}