const { exec } = require('child_process');
const path = require('path');

const TARGET_PROJECT = process.argv[2];
const SOURCE_PATH = path.join('..', 'margonem-addons', TARGET_PROJECT, 'dist');

const COPY_FILES = `npx copyfiles "${SOURCE_PATH}${path.sep}*.{js,css}" ".${path.sep}${TARGET_PROJECT}" --verbose --error --flat`;
const GIT_STAGE = `git add counter`;
const GIT_COMMIT = `git commit -m "release ${TARGET_PROJECT} ${(new Date).toUTCString()}"`;
const GIT_PUSH = `git push -u origin master`;

exec(COPY_FILES, () => {
  exec(GIT_STAGE, () => {
    exec(GIT_COMMIT, () => {
      exec(GIT_PUSH);
    });
  });
});
