import { execFileSync } from 'child_process';

const siteId = '5c29270e-422f-40b7-acb0-585e1288d383';

console.log('Fetching latest Netlify builds...');
try {
  const dataPayload = '{\\"site_id\\":\\"5c29270e-422f-40b7-acb0-585e1288d383\\"}';
  const out = execFileSync('npx', ['netlify', 'api', 'listSiteBuilds', '--data', dataPayload], { encoding: 'utf-8', shell: true });
  const builds = JSON.parse(out);
  console.log('Latest build info:');
  if (builds && builds.length > 0) {
    const latest = builds[0];
    console.log('ID:', latest.id);
    console.log('State:', latest.deploy_state);
    console.log('Error:', latest.error);
    console.log('Done:', latest.done);
  } else {
    console.log('No builds found.', out.substring(0, 300));
  }
} catch (e: any) {
  console.error('Error checking builds:', e.stdout || e.message);
}
