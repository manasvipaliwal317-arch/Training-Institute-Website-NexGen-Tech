import { execFileSync } from 'child_process';

const siteId = '5c29270e-422f-40b7-acb0-585e1288d383';

async function main() {
  const updateData = '{\\"site_id\\":\\"5c29270e-422f-40b7-acb0-585e1288d383\\",\\"body\\":{\\"repo\\":{\\"provider\\":\\"github\\",\\"repo\\":\\"manasvipaliwal317-arch/Training-Institute-Website-NexGen-Tech\\",\\"private\\":false,\\"branch\\":\\"main\\",\\"cmd\\":\\"npm run build\\",\\"dir\\":\\".next\\"},\\"build_settings\\":{\\"cmd\\":\\"npm run build\\",\\"dir\\":\\".next\\",\\"repo_path\\":\\"manasvipaliwal317-arch/Training-Institute-Website-NexGen-Tech\\",\\"repo_branch\\":\\"main\\"}}}';

  try {
    console.log('Updating Netlify site repo and build settings...');
    const out = execFileSync('npx', ['netlify', 'api', 'updateSite', '--data', updateData], { encoding: 'utf-8', shell: true });
    console.log('Update site success:\n', out.substring(0, 400));
  } catch (e: any) {
    console.error('Update site failed:', e.stdout || e.message);
  }

  // Trigger build
  try {
    const buildData = '{\\"site_id\\":\\"5c29270e-422f-40b7-acb0-585e1288d383\\"}';
    console.log('Triggering Netlify build...');
    const buildOut = execFileSync('npx', ['netlify', 'api', 'createSiteBuild', '--data', buildData], { encoding: 'utf-8', shell: true });
    console.log('Build output:\n', buildOut);
  } catch (e: any) {
    console.error('Trigger build failed:', e.stdout || e.message);
  }
}

main();
