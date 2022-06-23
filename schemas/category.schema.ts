import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Roles } from "../enums/roles.enum";
import { ViewStatusOptions } from "../consts/view-status-options";
import { ViewStatus } from "../enums/view-status";

export const Category = list({
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    parent: relationship({ ref: "Category" }),
    products: relationship({ ref: "Product", many: true }),
    status: select({
      options: ViewStatusOptions,
      defaultValue: ViewStatus.Draft,
      ui: { displayMode: "segmented-control" },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    lastModification: timestamp({
      defaultValue: { kind: "now" },
      db: {
        updatedAt: true,
      },
    }),
  },
  access: {
    operation: {
      create: ({ session }) => !!session && session.data.role !== Roles.Student,
      update: ({ session }) => !!session && session.data.role !== Roles.Student,
      delete: ({ session }) => !!session && session.data.role !== Roles.Student,
    },
  },
});
