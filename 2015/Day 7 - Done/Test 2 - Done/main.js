const inputs = document.getElementById('instructions').textContent.split('\n');

function solveCircuit(input) {
    const instructions = {};
    const signals = {};

    input.forEach(function (line) {
        const parts = line.split(" -> ");
        const left = parts[0];
        const right = parts[1];
        instructions[right] = left.split(" ");
    });

    let unresolved = true;

    while (unresolved) {
        unresolved = false;

        Object.keys(instructions).forEach(function (wire) {
            if (signals[wire] !== undefined) {
                return;
            }

            const rule = instructions[wire];
            let value;

            if (rule.length === 1) {
                const a = rule[0];

                if (!isNaN(a)) {
                    value = Number(a);
                } else if (signals[a] !== undefined) {
                    value = signals[a];
                }
            }

            if (rule.length === 2) {
                const a = rule[1];

                if (signals[a] !== undefined) {
                    value = (~signals[a]) & 65535;
                }
            }

            if (rule.length === 3) {
                const a = rule[0];
                const op = rule[1];
                const b = rule[2];

                let leftVal;
                let rightVal;

                if (!isNaN(a)) {
                    leftVal = Number(a);
                } else {
                    leftVal = signals[a];
                }

                if (!isNaN(b)) {
                    rightVal = Number(b);
                } else {
                    rightVal = signals[b];
                }

                if (leftVal !== undefined && rightVal !== undefined) {
                    if (op === "AND") {
                        value = leftVal & rightVal;
                    }

                    if (op === "OR") {
                        value = leftVal | rightVal;
                    }

                    if (op === "LSHIFT") {
                        value = (leftVal << rightVal) & 65535;
                    }

                    if (op === "RSHIFT") {
                        value = leftVal >>> rightVal;
                    }
                }
            }

            if (value !== undefined) {
                signals[wire] = value;
                unresolved = true;
            }
        });
    }

    return signals;
}

console.log(solveCircuit(inputs)['a']);