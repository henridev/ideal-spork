"use strict";
exports.__esModule = true;
var faker_1 = require("faker");
var fs_1 = require("fs");
var database = { posts: [] };
var postCount = 1000;
for (var i = 1; i <= postCount; i += 1) {
    database.posts.push({
        id: i,
        title: faker_1.lorem.text(10),
        body: faker_1.lorem.paragraph(),
        author: faker_1.name.firstName() + " " + faker_1.name.lastName()
    });
}
fs_1.writeFileSync(__dirname + "/db.json", JSON.stringify(database));
