// Existing import variants for db and contactMessages

//import { db } from '../../../src/db/client';
//import { contactMessages } from '../../../src/db/schema';

// Alternative import paths to test resolving issues
// Uncomment one at a time to test

// import { db } from '../../lib/db';
// import { contactMessages } from '../../db/schema';

// import { db } from '../../../lib/db';
// import { contactMessages } from '../../../db/schema';

// import { db } from '../../../../../src/lib/db';
// import { contactMessages } from '../../../../../src/db/schema';

// import { db } from './lib/db';
// import { contactMessages } from './db/schema';

// import { db } from '../lib/db';
// import { contactMessages } from '../db/schema';

// import { db } from 'src/lib/db';
// import { contactMessages } from 'src/db/schema';

// import { db } from 'lib/db';
// import { contactMessages } from 'db/schema';

// New import variants using path alias '@'

/**
 * Possible import variants using '@' alias from tsconfig.json
 * Uncomment one at a time to test
 */

//import { db } from '@/src/lib/db';
import { contactMessages } from '@/src/db/schema';

// import { db } from '@/lib/db';
//import { contactMessages } from '@/db/schema';

// import { db } from '@/src/modules/contacts/lib/db';
//import { contactMessages } from '@/src/modules/contacts/db/schema';

// import { db } from '@/modules/contacts/lib/db';
// import { contactMessages } from '@/modules/contacts/db/schema';

// import { db } from '@/lib/db';
// import { contactMessages } from '@/db/schema';

// import { db } from '@/src/lib/db/index';
// import { contactMessages } from '@/src/db/schema/index';

// import { db } from '@/src/lib';
// import { contactMessages } from '@/src/db';

// import { db } from '@/lib';
// import { contactMessages } from '@/db';
