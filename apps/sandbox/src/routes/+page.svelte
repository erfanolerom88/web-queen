<script lang="ts">
  import { onMount } from 'svelte';
  import '@web-queen/tokens/tokens.css';
  import { Button, Card, Checkbox, Dropdown, DropdownItem, DropdownTrigger, initializeTheme, Input, Select, setTheme, Switch, Textarea, Toast, showToast, validateValues } from '@web-queen/core';
  import { useGsap } from '@web-queen/motion';

  let projectName = 'Web Queen playground';
  let email = 'team@webqueen.dev';
  let workspaceType = 'design-system';
  let teamSize = '';
  let launchMode = '';
  let projectBrief = 'A shared, token-driven interface for the Web Queen product family.';
  let emailUpdates = true;
  let previewEnabled = false;
  let lightTheme = false;
  let isSubmitting = false;
  let submitComplete = false;
  let formErrors: Record<string, string> = {};
  let selectedAction = 'Choose an account action';

  onMount(() => {
    lightTheme = initializeTheme() === 'light';
  });

  function handleThemeChange(event: CustomEvent<boolean>) {
    lightTheme = event.detail;
    setTheme(lightTheme ? 'light' : 'dark');
  }

  function handleSubmit() {
    if (isSubmitting) return;

    formErrors = validateValues(
      { projectName, email, workspaceType, teamSize, launchMode, projectBrief },
      {
        projectName: { required: true, requiredMessage: 'Enter a project name.' },
        email: {
          required: true,
          format: 'email',
          requiredMessage: 'Enter a contact email.',
          formatMessage: 'Enter a valid email address.'
        },
        workspaceType: { required: true, requiredMessage: 'Choose a workspace type.' },
        teamSize: { required: true, requiredMessage: 'Choose a team size.' },
        launchMode: { required: true, requiredMessage: 'Choose a launch model.' },
        projectBrief: { required: true, requiredMessage: 'Enter a project brief.' }
      }
    );

    const errorCount = Object.keys(formErrors).length;
    if (errorCount > 0) {
      submitComplete = false;
      showToast(
        `Please correct ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} and try again.`,
        { title: 'Check your form', variant: 'warning' }
      );
      return;
    }

    isSubmitting = true;
    submitComplete = false;
    setTimeout(() => {
      isSubmitting = false;
      submitComplete = true;
      showToast('Your project has been saved.', { title: 'Success', variant: 'success' });
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

  <section class="quick-actions" aria-label="Account actions">
    <div>
      <h2 class="form-panel__title">Account actions</h2>
      <p class="quick-actions__status">{selectedAction}</p>
    </div>
    <Dropdown>
      <svelte:fragment slot="trigger" let:open let:toggle>
        <DropdownTrigger {open} on:click={toggle} on:activate={toggle}>Profile</DropdownTrigger>
      </svelte:fragment>
      <svelte:fragment slot="menu">
        <DropdownItem on:select={() => (selectedAction = 'Profile opened')}>View profile</DropdownItem>
        <DropdownItem on:select={() => (selectedAction = 'Account settings opened')}>Account settings</DropdownItem>
        <DropdownItem on:select={() => (selectedAction = 'Signed out')}>Sign out</DropdownItem>
      </svelte:fragment>
    </Dropdown>
  </section>

  <section class="form-panel" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.55 }}>
    <h2 class="form-panel__title">Project details</h2>
    <Input label="Project name" bind:value={projectName} error={formErrors.projectName ?? ''} placeholder="Enter project name" helperText="Short, memorable, and clear." fullWidth />
    <Input label="Contact email" type="email" bind:value={email} error={formErrors.email ?? ''} placeholder="you@example.com" helperText="Used for product updates and invites." fullWidth />

    <Select
      label="Workspace type"
      bind:value={workspaceType}
      options={workspaceOptions}
      error={formErrors.workspaceType ?? ''}
      helperText="Choose the product cluster this project belongs to."
      fullWidth
    />

    <Select
      label="Team size"
      bind:value={teamSize}
      options={sizeOptions}
      placeholder="Select team size"
      error={formErrors.teamSize ?? ''}
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
      error={formErrors.launchMode ?? ''}
      fullWidth
    />

    <fieldset class="settings-group">
      <legend class="settings-group__title">Project settings</legend>
      <Checkbox bind:checked={emailUpdates} label="Send me project updates by email" />
      <Switch bind:checked={previewEnabled} label="Enable private preview" />
    </fieldset>

    <fieldset class="settings-group">
      <legend class="settings-group__title">Appearance</legend>
      <Switch bind:checked={lightTheme} label="Use light theme" on:change={handleThemeChange} />
    </fieldset>

    <Textarea
      label="Project brief"
      bind:value={projectBrief}
      placeholder="Describe the project goals and audience"
      error={formErrors.projectBrief ?? ''}
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

  .quick-actions {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--color-border);
  }

  .quick-actions__status {
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
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

  .form-panel__title {
    margin: 0;
    color: var(--color-text);
    font-size: var(--text-xl);
    line-height: var(--leading-tight);
  }

  .settings-group {
    display: grid;
    gap: var(--space-4);
    margin: 0;
    padding: var(--space-4) 0;
    border: 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .settings-group__title {
    padding-right: var(--space-2);
    color: var(--color-text);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
  }
</style>
