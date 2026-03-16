import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const list = query({
    args: {},
    handler: async (ctx) =>
    {
        const user = await authComponent.getAuthUser(ctx);
        if (!user) return [];
        return await ctx.db
            .query("todos")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .collect();
    },
});

export const add = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) =>
    {
        const user = await authComponent.getAuthUser(ctx);
        if (!user) throw new Error("Not authenticated");
        await ctx.db.insert("todos", {
            text: args.text,
            completed: false,
            userId: user._id,
        });
    },
});

export const toggle = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) =>
    {
        const user = await authComponent.getAuthUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (!user || todo?.userId !== user._id) throw new Error("Unauthorized");
        await ctx.db.patch(args.id, { completed: !todo.completed });
    },
});

export const remove = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) =>
    {
        const user = await authComponent.getAuthUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (!user || todo?.userId !== user._id) throw new Error("Unauthorized");
        await ctx.db.delete(args.id);
    },
});
