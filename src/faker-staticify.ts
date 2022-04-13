#!/usr/bin/env node
import glob from "glob-promise";
import fs from "fs/promises";
import { randColor, randEmail, randFirstName, randLastName, randNumber, randPassword, randPhoneNumber, randText, randUrl, randUuid, randWord } from "@ngneat/falso";

async function main() {
  const specFiles = await getFiles();
  await processSpecFiles(specFiles);
}

async function getFiles(): Promise<Array<string>> {
  return glob("**/*.spec.ts");
}

async function processSpecFiles(specFiles: Array<string>) {
  for (const specFile of specFiles) {
    await processSpecFile(specFile);
  }
}

async function processSpecFile(specFile: string) {
  const buffer = await fs.readFile(specFile);
  let fileContents = buffer.toString();

  const numberToStringRegex = /faker.random.number\(([0-9]+?)?\).toString\(\)|faker.datatype.number\(([0-9]+?)?\).toString\(\)/g;
  fileContents = fileContents.replaceAll(numberToStringRegex, (_, max) =>
    `'${randNumber({ max }).toString()}'`
  );

  const numberRegex = /faker.random.number\(([0-9]+?)?\)|faker.datatype.number\(([0-9]+?)?\)/g;
  fileContents = fileContents.replaceAll(numberRegex, (_, max) =>
    randNumber({ max }).toString()
  );

  const wordRegex = /faker.random.word\(\)|faker.lorem.word\(\)|faker.random.alphaNumeric\(([0-9]+?)?\)/g;
  fileContents = fileContents.replaceAll(wordRegex, () => `'${randWord()}'`);

  const wordsRegex = /faker.random.words\(([0-9]+?)?\)|faker.lorem.sentence\(([0-9]+?)?\)|faker.lorem.text\(([0-9]+?)?\)|faker.lorem.paragraph\(([0-9]+?)?\)|faker.lorem.words\(([0-9]+?)?\)/g;
  fileContents = fileContents.replaceAll(wordsRegex, (_, length) => `'${randText({ length }).toString()}'`);

  const booleanRegex = /faker.random.boolean\(\)|faker.datatype.boolean\(\)/g;
  fileContents = fileContents.replaceAll(booleanRegex, () => 'true');

  const emailRegex = /faker.internet.email\(\)/g;
  fileContents = fileContents.replaceAll(emailRegex, () => `'${randEmail()}'`);

  const passwordRegex = /faker.internet.password\(\)/g;
  fileContents = fileContents.replaceAll(passwordRegex, () => `'${randPassword()}'`);

  const uuidRegex = /faker.datatype.uuid\(\)/g;
  fileContents = fileContents.replaceAll(uuidRegex, () => `'${randUuid()}'`);

  const firstNameRegex = /faker.name.firstName\(\)/g;
  fileContents = fileContents.replaceAll(firstNameRegex, () => `'${randFirstName()}'`);

  const lastNameRegex = /faker.name.lastName\(\)/g;
  fileContents = fileContents.replaceAll(lastNameRegex, () => `'${randLastName()}'`);

  const urlRegex = /faker.internet.url\(\)/g;
  fileContents = fileContents.replaceAll(urlRegex, () => `'${randUrl()}'`);

  const phoneRegex = /faker.phone.phoneNumber\(\)/g;
  fileContents = fileContents.replaceAll(phoneRegex, () => `'${randPhoneNumber()}'`);

  const colorRegex = /faker.internet.color\(\)/g;
  fileContents = fileContents.replaceAll(colorRegex, () => `'${randColor()}'`);

  await fs.writeFile(specFile, fileContents);
}

main();
