export const directors = () => {
  const directors = [
    'david@lynch.com',
    'akira@kurosawa.com',
    'stanley@kubric.com',
    'martin@scorsese.com',
    'ingmar@bergman.com',
    'orson@welles.com',
    'billy@wilder.com',
    'andrei@tarkovsky.com',
    'paul.thomas@anderson.com',
    'federico@fellini.com',
  ];

  return directors[Math.floor(Math.random() * directors.length)];
};
