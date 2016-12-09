const courses = require('./courses');


module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/wizards/{id}/courses',
      handler: ({ params, payload }, reply) => {
        const wizard = getOne(wizards, params.id);
        !wizard.courses.some(c => payload.courseNumber === c) && wizard.courses.push(payload.courseNumber);
        reply().code(201);
      },
    },
    {
      method: 'GET',
      path: '/wizards',
      handler:(request, reply) => reply(getAll(wizards)),
    },
    {
      method: 'GET',
      path: '/wizards/{id}',
      handler: (request, reply) => {
        const wizard = getOne(wizards, request.params.id);
        wizard.courses = wizard.courses.map(courses.getOne);
        return wizard ? reply(wizard) : reply().code(404);
      },
    },
    {
      method: 'PUT',
      path: '/wizards/{id}',
      handler: (request, reply) => {
        const wizard = getOne(wizards, request.params.id);
        wizard ? updateOne(wizard, request.payload) && reply().code(202) : reply().code(404);
      },
    },
    {
      method: 'POST',
      path: '/wizards',
      handler: (request, reply) => {
        try {
          createOne(wizards, request.payload) && reply().code(201);
        } catch (e) {
          return reply(e).code(500);
        }
      },
    },
    {
      method: 'DELETE',
      path: '/wizards/{id}',
      handler: (request, reply) => {
        getOne(wizards, request.params.id)
          ? deleteOne(wizards, request.params.id) && reply().code(202)
          : reply().code(404);
      },
    },
  ],
};

const ids = () => {
  let next = 0;
  return () => {
    next += 1;
    return next.toString();
  };
};

const getId = ids();

const getAll = (wizards) => wizards.map(w => ({
  id: w.id,
  name: w.name,
  house: w.house,
  courses: w.courses,
}));

const getOne = (wizards, id) => wizards.find(w => w.id === id);

const updateOne = (wizard, updated) => Object.assign(wizard, {
  name: updated.name,
  house: updated.house,
  courses: updated.courses || [],
});

const deleteOne = (wizards, id) => wizards.splice(wizards.findIndex(w => w.id === id), 1);
const createOne = (wizards, wizard) => wizards.push(Object.assign({id: getId(), courses: []}, wizard));

const wizards = [
  { id: getId(), name: "Harry Potter", house: "Gryphindor", courses: [] },
  { id: getId(), name: "Draco Malfoy", house: "Slytherin", courses: [] },
];
