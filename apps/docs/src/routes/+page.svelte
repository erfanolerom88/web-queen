<script lang="ts">
  import '@web-queen/tokens/tokens.css';
  import { tokens } from '@web-queen/tokens';
  import { Button, Card, Input, Select, Textarea, Toast, showToast } from '@web-queen/core';
  import { useGsap } from '@web-queen/motion';

  const docsOptions = [
    { value: 'tokens', label: 'Tokens' },
    { value: 'components', label: 'Components' },
    { value: 'patterns', label: 'Patterns' },
    { value: 'motion', label: 'Motion' }
  ];
</script>

<svelte:head>
  <title>UI Library Docs</title>
</svelte:head>

<Toast />

<main style="padding: 2rem; background: {tokens.colors.background}; color: {tokens.colors.text}; min-height: 100vh; font-family: sans-serif;">
  <div style="max-width: 720px; margin: 0 auto;">
    <h1 use:useGsap={{ y: 18, opacity: 0, duration: 0.8 }} style="font-size: 2.25rem; margin-bottom: 1rem;">UI Library Docs</h1>
    <p use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.1 }} style="color: {tokens.colors.muted}; line-height: 1.7; margin-bottom: 1.5rem;">
      The documentation app is ready to host stories, component examples, and design tokens as the project grows.
    </p>

    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.2 }} style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Saving</Button>
      <Button variant="secondary" on:click={() => showToast('The notification system is ready.', { title: 'Success' })}>
        Show toast
      </Button>
    </div>

    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
      <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.3 }}>
        <Card title="Core components" tone="highlight">
          Buttons and cards form the base layer for the rest of the UI library.
        </Card>
      </div>
      <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.45 }}>
        <Card title="Next phase">
          We will add motion, tokens-driven variants, and a more polished docs system.
        </Card>
      </div>
    </div>

    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.6 }}>
      <Input label="Project label" placeholder="Enter label" helperText="Input component foundation" fullWidth />
    </div>

    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.75 }} style="margin-top: 1rem;">
      <Select
        label="Docs section"
        value="components"
        options={docsOptions}
        helperText="Select a section to review the system."
        fullWidth
      />
    </div>

    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.9 }} style="margin-top: 1rem;">
      <Textarea
        label="Component notes"
        value="Document usage details and accessibility considerations."
        helperText="Textarea component foundation"
        rows={3}
        fullWidth
      />
    </div>
  </div>
</main>
