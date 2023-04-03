<script lang="ts">
    import { onMount } from 'svelte'
    import { Motion } from 'svelte-motion'

    import X from './icons/X.svelte'

    type Todo = {
        id: number
        title: string
        completed: boolean
    }

    let todo = [] as Todo[]
    let value = ''

    function save() {
        localStorage.setItem('todo', JSON.stringify(todo))
    }

    function load() {
        todo = JSON.parse(localStorage.getItem('todo') || '[]')
    }

    onMount(load)
</script>

<div
    class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full max-w-4xl px-4 h-full flex flex-col justify-center"
>
    <Motion
        let:motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
    >
        <input
            type="text"
            placeholder="Create a todo"
            class="border-2 border-black w-full h-16 rounded-md px-2 mb-2 font-medium text-black"
            use:motion
            bind:value
            on:keydown={e => {
                if (e.key === 'Enter') {
                    todo = [...todo, { id: todo.length + 1, title: value, completed: false }]
                    value = ''
                    save()
                }
            }}
        />
    </Motion>

    <ul class="flex flex-col gap-y-2">
        {#each todo as item, index}
            <!-- TODO: Add exit animation -->
            <!-- ! AnimatePresence not working :/ -->
            <Motion
                let:motion
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
                <li use:motion>
                    <button
                        class="flex items-center justify-between w-full py-3 px-2 rounded-md"
                        class:bg-white-contrast={item.completed}
                        on:click={() => {
                            item.completed = !item.completed
                            save()
                        }}
                    >
                        <span
                            class="text-3xl font-medium text-black text-left"
                            class:line-through={item.completed}
                        >
                            {item.title}
                        </span>
                        <button
                            on:click={() => {
                                todo = todo.filter(todo => todo.id !== item.id)
                                save()
                            }}
                        >
                            <X />
                        </button>
                    </button>
                </li>
            </Motion>
        {/each}
    </ul>
</div>
