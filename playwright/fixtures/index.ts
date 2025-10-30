import { mergeTests } from '@playwright/test';
import { test as boardFixtures } from './board';
import { test as listFixtures } from './list';
import { test as settingFixtures } from './settings';
import { test as taskFixtures } from './task';
import { test as userFixtures } from './user';

export const test = mergeTests(
    userFixtures,
    settingFixtures,
    boardFixtures,
    listFixtures,
    taskFixtures,
);
export const expect = test.expect;
