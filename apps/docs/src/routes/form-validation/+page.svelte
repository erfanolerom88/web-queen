<script lang="ts">
  import { onMount } from 'svelte';
  import '@web-queen/tokens/tokens.css';
  import { Button, Checkbox, initializeTheme, Input, Select, setTheme, Switch, Toast, showToast, validateValues } from '@web-queen/core';

  let projectName = '';
  let ownerEmail = '';
  let teamSize = '';
  let emailUpdates = true;
  let privatePreview = false;
  let lightTheme = false;
  let isSubmitting = false;
  let errors: Record<string, string> = {};

  onMount(() => {
    lightTheme = initializeTheme() === 'light';
  });

  function handleThemeChange(event: CustomEvent<boolean>) {
    lightTheme = event.detail;
    setTheme(lightTheme ? 'light' : 'dark');
  }

  const teamSizes = [
    { value: 'small', label: '1-10 people' },
    { value: 'medium', label: '11-50 people' },
    { value: 'large', label: '51+ people' }
  ];

  const exampleCode = `const errors = validateValues(
  { projectName, ownerEmail, teamSize },
  {
    projectName: { required: true },
    ownerEmail: { required: true, format: 'email' },
    teamSize: { required: true }
  }
);

if (Object.keys(errors).length) {
  // Display each message in the matching field.
  return;
}

// Continue with the async submit operation.`;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    errors = validateValues(
      { projectName, ownerEmail, teamSize },
      {
        projectName: { required: true, requiredMessage: 'Enter a project name.' },
        ownerEmail: {
          required: true,
          format: 'email',
          requiredMessage: 'Enter the project owner email.',
          formatMessage: 'Enter a valid email address.'
        },
        teamSize: { required: true, requiredMessage: 'Choose a team size.' }
      }
    );

    if (Object.keys(errors).length > 0) {
      showToast('Review the highlighted fields before continuing.', {
        title: 'Check your details',
        variant: 'warning'
      });
      return;
    }

    isSubmitting = true;
    setTimeout(() => {
      isSubmitting = false;
      showToast('Your project request is ready for review.', {
        title: 'Request submitted',
        variant: 'success'
      });
    }, 800);
  }
</script>

<svelte:head>
  <title>Form &amp; Validation | UI Library Docs</title>
  <meta name="description" content="Build validated forms with Web Queen Input, Select, Button, and validateValues." />
</svelte:head>

<Toast />

<main class="guide">
  <a class="guide__back" href="/">← UI Library Docs</a>
  <header class="guide__header">
    <div>
      <p class="guide__eyebrow">Patterns / Forms</p>
      <h1>Form &amp; Validation</h1>
      <p class="guide__intro">
        Combine token-styled fields with reusable rules, field-level feedback, and a clear submit state.
        This project intake example validates before simulating a request.
      </p>
    </div>
    <Switch bind:checked={lightTheme} label="Use light theme" on:change={handleThemeChange} />
  </header>

  <section class="guide__section" aria-labelledby="example-heading">
    <div class="guide__section-heading">
      <div>
        <p class="guide__eyebrow">Live example</p>
        <h2 id="example-heading">New project request</h2>
      </div>
      <span class="guide__step">01 / 02</span>
    </div>

    <form class="intake-form" on:submit={handleSubmit}>
      <Input
        label="Project name"
        bind:value={projectName}
        error={errors.projectName ?? ''}
        placeholder="e.g. Customer portal refresh"
        helperText="Use a short name your team will recognize."
        fullWidth
      />
      <Input
        label="Owner email"
        type="email"
        bind:value={ownerEmail}
        error={errors.ownerEmail ?? ''}
        placeholder="name@company.com"
        helperText="We’ll use this for project updates."
        fullWidth
      />
      <Select
        label="Team size"
        bind:value={teamSize}
        options={teamSizes}
        placeholder="Select team size"
        error={errors.teamSize ?? ''}
        helperText="Choose the group that will own this project."
        fullWidth
      />
      <fieldset class="settings-group">
        <legend class="settings-group__title">Project settings</legend>
        <Checkbox bind:checked={emailUpdates} label="Email me project updates" />
        <Switch bind:checked={privatePreview} label="Enable private preview" />
      </fieldset>
      <div class="intake-form__actions">
        <Button type="submit" loading={isSubmitting}>Submit request</Button>
      </div>
    </form>
  </section>

  <section class="guide__section guide__code" aria-labelledby="code-heading">
    <div class="guide__section-heading">
      <div>
        <p class="guide__eyebrow">Reusable utility</p>
        <h2 id="code-heading">Validate before submitting</h2>
      </div>
      <span class="guide__step">02 / 02</span>
    </div>
    <p class="guide__copy">
      <code>validateValues</code> accepts a values object and per-field rules. It returns a map of field names to messages,
      which can be passed directly to each component’s <code>error</code> prop.
    </p>
    <pre><code>{exampleCode}</code></pre>
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

  .guide {
    width: min(100% - 2 * var(--space-6), 760px);
    margin: 0 auto;
    padding: var(--space-8) 0 var(--space-12);
  }

  .guide__back {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    text-decoration: none;
  }

  .guide__back:hover { color: var(--color-text); }

  .guide__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-6);
    padding: var(--space-8) 0 var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .guide__eyebrow {
    margin: 0 0 var(--space-2);
    color: var(--color-accent);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }

  h1,
  h2,
  p { margin-top: 0; }

  h1 {
    margin-bottom: var(--space-3);
    font-size: var(--text-4xl);
    line-height: var(--leading-tight);
  }

  .guide__intro,
  .guide__copy {
    max-width: 62ch;
    margin-bottom: 0;
    color: var(--color-text-muted);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
  }

  .guide__section {
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .guide__section-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .guide__section-heading .guide__eyebrow { margin-bottom: var(--space-1); }

  h2 {
    margin-bottom: 0;
    font-size: var(--text-xl);
    line-height: var(--leading-tight);
  }

  .guide__step {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    white-space: nowrap;
  }

  .intake-form {
    display: grid;
    gap: var(--space-5);
    max-width: 520px;
  }

  .intake-form__actions { padding-top: var(--space-1); }

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

  .guide__copy { margin-bottom: var(--space-4); }

  .guide__copy code {
    color: var(--color-text);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  }

  pre {
    overflow-x: auto;
    margin: 0;
    padding: var(--space-5);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-sm);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  pre code {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    white-space: pre;
  }

  @media (max-width: 520px) {
    .guide { width: calc(100% - 2 * var(--space-4)); }
    .guide__header { flex-direction: column; }
    .guide__section-heading { gap: var(--space-2); }
    .guide__step { font-size: 0.75rem; }
    pre { padding: var(--space-4); }
  }
</style>