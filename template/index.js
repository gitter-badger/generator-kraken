/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2014 eBay Software Foundation                                │
│                                                                             │
│hh ,'""`.                                                                    │
│  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
│  |(@)(@)|  you may not use this file except in compliance with the License. │
│  )  __  (  You may obtain a copy of the License at                          │
│ /,'))((`.\                                                                  │
│(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
│ `\ `)(' /'                                                                  │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/
'use strict';


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    krakenutil = require('../util');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.update();

    // Create the corresponding locale as well
    this.hookFor('kraken:locale', {
        args: args,
        options: {
            options: options
        }
    });

    // Handle errors politely
    this.on('error', function (err) {
        console.error(err.message);
        console.log(this.help());
        process.exit(1);
    });
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.defaults = function defaults() {
    this.argument('name', { type: String, required: true });
};


Generator.prototype.files = function files() {
    this.template('template.dust', path.join('public', 'templates', this.name + '.dust'));
};
