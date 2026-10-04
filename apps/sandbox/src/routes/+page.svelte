<script lang="ts">
  import '@web-queen/tokens/tokens.css';
  import { Button, Card, Input, Select, Textarea, Toast, showToast } from '@web-queen/core';
  import { useGsap } from '@web-queen/motion';

  let projectName = 'Web Queen playground';
  let email = 'team@webqueen.dev';
  let workspaceType = 'design-system';
  let teamSize = '';
  let launchMode = '';
  let projectBrief = 'A shared, token-driven interface for the Web Queen product family.';
  let isSubmitting = false;
  let submitComplete = false;

  function handleSubmit() {
    if (isSubmitting) return;

    isSubmitting = true;
    submitComplete = false;
    setTimeout(() => {
      isSubmitting = false;
      submitComplete = true;
      showToast('Your project has been saved.', { title: 'Success' });
    }, 900);
  }

  const workspaceOptions = [
    { value: 'design-system', label: 'Design system' },
    { value: 'internal-tools', label: 'Internal tools' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'studio', label: 'Studio' }
  ];

  const sizeOptions = [
    { value: 'solo', label: 'Solo' },
    { value: 'small-team', label: 'Small team' },
    { value: 'medium-team', label: 'Medium team' },
    { value: 'enterprise', label: 'Enterprise' }
  ];
</script>

<svelte:head>
  <title>Sandbox</title>
</svelte:head>

<Toast />

<main class="page">
  <section class="hero">
    <h1 class="hero__title" use:useGsap={{ y: 18, opacity: 0, duration: 0.8 }}>Hello, Web Queen team!</h1>
    <p class="hero__sub" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.1 }}>
      This is the first runnable sandbox for the UI library foundation. We are establishing the workspace,
      package structure, and first shared theme tokens before moving into components and animation work.
    </p>
    <div class="hero__actions" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.2 }}>
      <Button variant="primary">Launch project</Button>
      <Button variant="secondary">Review plan</Button>
      <Button variant="ghost">Ghost action</Button>
    </div>
  </section>

  <section class="cards">
    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.3 }}>
      <Card title="Foundation complete">
        The workspace is set up, the packages are linked, and the visual tokens are live.
      </Card>
    </div>
    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.45 }}>
      <Card title="Next milestone">
        We are moving from foundation to reusable UI building blocks and animation-ready system primitives.
      </Card>
    </div>
  </section>

  <section class="form-panel" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.55 }}>
    <Input label="Project name" bind:value={projectName} placeholder="Enter project name" helperText="Short, memorable, and clear." fullWidth />
    <Input label="Contact email" type="email" bind:value={email} placeholder="you@example.com" helperText="Used for product updates and invites." fullWidth />

    <Select
      label="Workspace type"
      bind:value={workspaceType}
      options={workspaceOptions}
      helperText="Choose the product cluster this project belongs to."
      fullWidth
    />

    <Select
      label="Team size"
      bind:value={teamSize}
      options={sizeOptions}
      placeholder="Select team size"
      helperText="This helps tune onboarding and permission defaults."
      fullWidth
    />

    <Select
      label="Launch model"
      bind:value={launchMode}
      options={[
        { value: 'pilot', label: 'Pilot rollout' },
        { value: 'full', label: 'Full launch' },
        { value: 'expansion', label: 'Expansion phase' }
      ]}
      placeholder="Choose a launch model"
      error="Please select a launch model to continue."
      fullWidth
    />

    <Textarea
      label="Project brief"
      bind:value={projectBrief}
      placeholder="Describe the project goals and audience"
      helperText="A short summary to align the team."
      rows={4}
      fullWidth
    />

    <div class="form-panel__actions">
      <Button loading={isSubmitting} on:click={handleSubmit}>
        {submitComplete ? 'Project saved' : 'Save project'}
      </Button>
    </div>
  </section>
</main>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; }

  :global(body) {
    margin: 0;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
  }

  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: var(--space-12) var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .hero__title {
    font-size: var(--text-4xl);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
    color: var(--color-text);
    margin: 0;
  }

  .hero__sub {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
    margin: 0;
    max-width: 60ch;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .form-panel {
    display: grid;
    gap: var(--space-4);
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .form-panel__actions {
    display: flex;
    justify-content: flex-start;
  }
</style>
