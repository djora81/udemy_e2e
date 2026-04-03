import { test as teardown } from '@playwright/test';
import fs from 'fs';

teardown('Global teardown - delete file', async ({ }) => {
  console.log('deleting test file...');
  const filePath = './tests/storage.state.json';

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('Test file deleted.');
  }
  console.log('deleting test file finished.');
});
