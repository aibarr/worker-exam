module.exports = function override(config, env) {
    const oneOfRuleIndex = config.module.rules.findIndex((rule) => rule['oneOf'] !== undefined);
    if (oneOfRuleIndex < 0) {
        console.error("Did not find the oneOf rule!");
        // Exit here so that you can debug the failed test
        throw Error("oneOf Rule test failed");
    }

    const oneOfRule = config.module.rules[oneOfRuleIndex];

    // Find the rule for compiling the project's javascript
    const jsRuleIndex = oneOfRule.oneOf.findIndex(
        (rule) => rule.test && String(rule.test) === String(/\.(js|mjs|jsx|ts|tsx)$/)
    );
    if (jsRuleIndex < 0) {
        // Oops, test is wrong
        console.error("Did not find the standard javascript processing rule!");
        // Exit here so that you can debug the failed test
        throw Error("Rule test for /\.(js|mjs|jsx|ts|tsx)$/ failed");
    }
    // Add an exclusion to the normal javascript compile rule so that it doesn't try to compile
    // your worker files.
    const jsRule = oneOfRule.oneOf[jsRuleIndex];
    jsRule.exclude = /\.worker\.js$/;
    // Insert the new rule for your worker files into the oneOf rule array just before the normal javascript
    // compile rule
    oneOfRule.oneOf.splice(
        jsRuleIndex,
        0,
        {
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' }
        }
    );

    // Then do the rest of your overrides.
    config.output.globalObject = 'this';
    return config;
}