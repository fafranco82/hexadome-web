const path = require("path");
const svgFilePath = path.join(__dirname, "./src/assets/svg");

module.exports = {
    chainWebpack: config => {
        //svgicon loader

        config.module
            .rule("vue-svgicon")
            .test(/\.svg$/)
            .use("svgicon")
            .loader("@yzfe/vue-svgicon-loader")
            .options({
                idSeparator: "_",
                svgFilePath: svgFilePath,
            });

        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options.transformAssetUrls = options.transformAssetUrls || {};
                options.transformAssetUrls["icon"] = ["data"];
                return options;
            });

        config.module.rule("svg").exclude.add(svgFilePath);
        config.resolve.alias.set("@icon", svgFilePath);
    },

    lintOnSave: undefined,

    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/_variables.scss";`,
            },
        },
    },

    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "en",
            localeDir: "locales",
            enableInSFC: false,
        },
    },

    devServer: {
        disableHostCheck: true,
    },
};
