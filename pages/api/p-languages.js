import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'lib');
  // Read the json data file p-languages.json
  const fileContents = await fs.readFile(jsonDirectory + '/p-languages.json', 'utf8');
  // Parse the file contents into a JavaScript object
  const data = JSON.parse(fileContents);
  // Return the data as JSON
  res.status(200).json(data);
}
