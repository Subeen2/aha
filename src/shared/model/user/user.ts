// import { verifySession } from "@/shared/lib/session";
// import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";
import { cache } from "react";

export const getUser = cache(async () => {
  //   const session = await verifySession();
  //   const data = await db.query.users.findMany({
  //     where: eq(users.id, session.userId),
  //     columns: { name: true, email: true },
  //   });
  //   const user = data[0];
  //   const filteredUser = userDTO(user);
  //   return filteredUser;
});

// function userDTO(user) {
//   taintUniqueValue(
//     "Do not pass a user session token to the client",
//     user,
//     user.session.token
//   );
//   return {
//     name: user.name,
//     email: user.email,
//     session: user.session,
//     // auditTrail: canViewAudit(user.auditTrail, user.role),
//   };
// }

// // function canViewAudit(auditTrail, role) {
// //   return role === "admin" ? auditTrail : null;
// // }
