import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, admin, trainers, (list)|(create)|(edit)|(show)|(delete)
p, admin, trainers/*, (edit)|(show)|(delete)
p, admin, trainers/*, field

p, admin, image_gallery, (list)|(create)|(edit)|(show)|(delete)
p, admin, image_gallery/*, (edit)|(show)|(delete)
p, admin, image_gallery/*, field

p, admin, profiles, (list)|(create)|(edit)|(show)|(delete)
p, admin, profiles/*, (edit)|(show)|(delete)

p, admin, calendar, (list)|(create)|(edit)|(show)|(delete)
p, admin, calendar/*, (edit)|(show)
p, admin, calendar/*, field

p, admin, posts, (list)|(create)|(edit)|(show)|(delete)
p, admin, posts/*, (edit)|(show)|(delete)
p, admin, posts/*, field

p, admin, post_comments, (list)|(create)|(edit)|(show)|(delete)
p, admin, post_comments/*, (edit)|(show)|(delete)
p, admin, post_comments/*, field

p, customer, trainers, list
p, customer, trainers/*, (show)

p, customer, image_gallery, list
p, customer, image_gallery/*, (show)

p, customer, calendar, list
p, customer, calendar/*, show

p, customer, posts, list
p, customer, posts/*, (show)

`);
