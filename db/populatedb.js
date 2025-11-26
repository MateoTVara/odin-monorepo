const { Client } = require('pg');
const { argv, exit, env } = require('node:process');

require('dotenv').config();
const { CONNECTION_STRING } = env;

const DESCRIPTIONS = {
  kiichi: 'Left to himself at an early age in the slummiest parts of today’s Japan, Kiichi learns how to survive on his own. As a teenager, how can he adapt to a society whose rules he rejects? Unless he creates his own rules… Kiichi, a raw icon of strength and integrity, stands alone against the world’s injustice and becomes an unforgettable character.',
  no5: `
    A science-fiction thriller set in a powerfully imagined multicultural future landscape that resembles the current Middle East, NO. 5 is the latest work from the acclaimed creator of BLACK & WHITE, Taiyo Matsumoto.

    No. 5 battles against the forces of the Rainbow Council. In a world that has become 70% harsh desert, the Rainbow Council of the International Peace Keeping Forces, a team of super-powered global security guardians, have a growing crisis on their hands. No. 5, one of their own and known within the council as their top marksman, has left his post and gone rogue.

    It's up to the other guardians to track him down--but No. 5, with his mysterious companion Matroshka, won't go down without a fight.
  `,
  bokugaya: `
    Although satisfied with his average lifestyle, Tobio Masubuchi wishes for a long and fun existence, hoping that nothing will get in his way. Alongside his good friends Sho Isami, Yuki "Maru" Maruyama, and Hidero "Paisen" Kosaka, the group passes each day worry free, doing as they please. But when delinquents from a neighboring school overhear Maru saying that they should die, their troubles begin.

    After being kidnapped and brutally assaulted, Maru is found by his friends, who are shocked to see what has been done to him. Angry, Tobio proposes that they take immediate revenge, and after deciding how they should do so, the four put their plan into action. But when what should have been just a prank turns deadly, Tobio's aspirations for an undisturbed life are shattered forever. 
  `,
}

const sqlEscape = (s = '') => String(s).replace(/'/g, "''");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  action TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS manga (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50),
  startDate DATE,
  endDate DATE
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR(255) NOT NULL,
  birth DATE,
  gender VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS manga_genres (
  manga_id INTEGER REFERENCES manga(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (manga_id, genre_id)
);

CREATE TABLE IF NOT EXISTS manga_staff (
  manga_id INTEGER REFERENCES manga(id) ON DELETE CASCADE,
  staff_id INTEGER REFERENCES staff(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  PRIMARY KEY (manga_id, staff_id, role_id)
);

-- SEED DATA

INSERT INTO manga (title, description, status, startDate, endDate)
VALUES
  ('Kiichi!!', '${sqlEscape(DESCRIPTIONS.kiichi)}', 'Finished', '2001-07-27', '2006-03-28'),
  ('No. 5', '${sqlEscape(DESCRIPTIONS.no5)}', 'Finished', '2000-11-30', '2005-10-25'),
  ('Bokutachi ga Yarimashita', '${sqlEscape(DESCRIPTIONS.bokugaya)}', 'Finished', '2015-04-06', '2017-01-23');

INSERT INTO genres (title)
VALUES
  ('Drama'), ('Psychological'), ('Action'), ('Adventure'), ('Sci-fi'),
  ('Thriller'), ('Comedy'), ('Romance'), ('Slice of Life')
ON CONFLICT DO NOTHING;

INSERT INTO roles (title)
VALUES
  ('Story & Illustration'), ('Story'), ('Illustration'),
  ('Translator (English)'), ('Translator (French)')
ON CONFLICT DO NOTHING;

INSERT INTO staff (fullname, birth, gender)
VALUES
  ('Hideki Arai', '1963-09-15', 'Male'),
  ('Taiyo Matsumoto', '1967-10-25', 'Male'),
  ('Muneyuki Kaneshiro', '1987-12-09', 'Male'),
  ('Hikaru Araki', NULL, NULL),
  ('Michael Arias', '1968-02-02', 'Male'),
  ('Thibaud Desbief', NULL, NULL);

-- Manga genres assignment
INSERT INTO manga_genres (manga_id, genre_id)
VALUES
  (1, 1), (1, 2),

  (2, 3), (2, 4), (2, 2), (2, 5), (2, 6),

  (3, 3), (3, 7), (3, 1), (3, 2), (3, 8), (3, 9), (3, 6);

-- Manga roles assignment
INSERT INTO manga_staff (manga_id, staff_id, role_id)
VALUES
  (1, 1, 1), -- Hideki Arai: Story & Illustration on Kiichi!!
  (2, 2, 1), -- Taiyo Matsumoto: Story & Illustration on No. 5
  (3, 3, 2), -- Kaneshiro: Story on Bokutachi
  (3, 4, 3), -- Araki: Illustration on Bokutachi
  (2, 5, 4), -- Arias: English Translator on No.5
  (2, 6, 5); -- Desbief: French Translator on No.5
`;

const usage = () => {
  console.log('Usage: node db/populatedb.js <connection-string>');
  console.log('Examples:');
  console.log('  node db/populatedb.js "postgresql://<user>:<password>@localhost:5432/top_inventory"');
  console.log('  node db/populatedb.js "postgresql://<user>:<password>@prod-host:5432/prod_db"');
}

const main = async () => {
  console.log('seeding...');
  const client = new Client({
    connectionString: argv[2] || CONNECTION_STRING
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (error) {
    console.error('Error seeding DB:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

if (argv.includes('--help') || process.argv.includes('-h')) {
  usage();
  exit();
}

main();