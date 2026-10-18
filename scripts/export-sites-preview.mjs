// Make a static visual preview from a successful production Next.js build.
// The production source retains its Node.js email route for Vercel/Hostinger.
import fs from 'node:fs';
import path from 'node:path';
const target=process.argv[2];
if(!target||!path.isAbsolute(target))throw new Error('Pass an absolute output directory.');
fs.mkdirSync(target,{recursive:true});
fs.cpSync('public',target,{recursive:true});
fs.mkdirSync(path.join(target,'_next','static'),{recursive:true});
fs.cpSync('.next/static',path.join(target,'_next','static'),{recursive:true});
const root=path.resolve('.next/server/app');
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){walk(file);continue;}if(!file.endsWith('.html'))continue;const relative=path.relative(root,file);if(relative.startsWith('_not-found')){fs.copyFileSync(file,path.join(target,'404.html'));continue;}if(relative.startsWith('_'))continue;const destination=relative==='index.html'?path.join(target,'index.html'):path.join(target,relative.slice(0,-5),'index.html');fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(file,destination);}}
walk(root);
for(const name of ['sitemap.xml','robots.txt']){const built=path.join(root,name+'.body');if(fs.existsSync(built))fs.copyFileSync(built,path.join(target,name));}
console.log('Static visual preview exported. Email delivery remains on the Next.js host.');
