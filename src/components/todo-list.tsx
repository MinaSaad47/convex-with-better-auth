import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { CheckCircle, Circle, LogOut, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const todoSchema = z.object({
  text: z.string().min(1, "Todo cannot be empty"),
});

type TodoValues = z.infer<typeof todoSchema>;

export function TodoList()
{
  const todos = useQuery(api.todos.list);
  const addTodo = useMutation(api.todos.add);
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.remove);

  const { control, handleSubmit, reset } = useForm<TodoValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = async (data: TodoValues) =>
  {
    await addTodo({ text: data.text });
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <Button variant="ghost" size="icon" onClick={() => authClient.signOut()}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-start">
        <div className="flex-1">
          <Controller
            name="text"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} placeholder="Add a new task..." />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {todos?.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTodo({ id: todo._id })}>
                {todo.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                {todo.text}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTodo({ id: todo._id })}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {todos?.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
