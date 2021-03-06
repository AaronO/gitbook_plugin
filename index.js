module.exports = {
    book: {
        assets: "./book",
        js: [
            "script.js"
        ],
        css: [
            "styles.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book "+this.options.title+" -->"
            },
            "html:end": function() {
                return "<!-- End of book "+this.options.title+" -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": function() {
                var config = this.options.pluginsConfig.simple || {};
                
                if (!config.token) {
                	throw "Need to option 'token' for Google Analytics plugin";
                }
                
                if (!config.configuration) {
                	config.configuration = 'auto';
                }

                if(typeof config.configuration === 'object' && config.configuration !== null) {
                	configuration = JSON.stringify(config.configuration);
                }
                else if (['auto', 'none'].indexOf(config.configuration) != -1) {
                	configuration = "'" + config.configuration + "'";
                }
              
                if (typeof config.domains !== null) {
                  multi_domain = "{'allowLinker': true}";
                  domains = config.domains;
                }

                return "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"
                + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"
                + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"
                + "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"
                + "ga('create', '"+config.token+"', "+configuration+", "+multi_domain+");"
                + "ga('require', 'linker');"
                + "ga('linker:autoLink', ["+domains+"] );"
                + "ga('require', 'linkid', 'linkid.js');"
                + "ga('require', 'displayfeatures');"
                + "ga('send', 'pageview');</script>";
            }
        }
    },
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("init!");
        },

        // This is called after the book generation
        "finish": function() {
            console.log("finish!");
        },

        // The following hooks are called for each page of the book
        // and can be used to change page content (html, data or markdown)


        // Before parsing markdown
        "page:before": function(page) {
            // page.path is the path to the file
            // page.content is a string with the file markdown content

            // Example:
            //page.content = "# Title\n" + page.content;

            return page;
        },

        // Before html generation
        "page": function(page) {
            // page.path is the path to the file
            // page.sections is a list of parsed sections

            // Example:
            //page.sections.unshift({type: "normal", content: "<h1>Title</h1>"})

            return page;
        },

        // After html generation
        "page:after": function(page) {
            // page.path is the path to the file
            // page.content is a string with the html output

            // Example:
            //page.content = "<h1>Title</h1>\n" + page.content;
            // -> This title will be added before the html tag so not visible in the browser

            return page;
        }
    }
};
