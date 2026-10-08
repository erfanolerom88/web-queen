<script lang="ts">
  import { onMount } from 'svelte';
  import '@web-queen/tokens/tokens.css';
  import {
    Button,
    Card,
    Dropdown,
    DropdownItem,
    DropdownTrigger,
    initializeTheme,
    Input,
    Modal,
    Select,
    setTheme,
    Switch,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    Textarea,
    Toast,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    showToast
  } from '@web-queen/core';
  import { useGsap } from '@web-queen/motion';

  let deleteDialogOpen = false;
  let lightTheme = false;
  let selectedProfileAction = 'Account actions';
  let activeExampleTab = 'preview';

  const exampleSource = `<Tabs bind:active={activeTab} id="example">
  <svelte:fragment slot="list" let:active let:selectTab let:id>
    <TabList active={active} baseId={id} {selectTab} label="Example view">
      <Tab id="preview" active={active === 'preview'} baseId={id} {selectTab}>Preview</Tab>
      <Tab id="code" active={active === 'code'} baseId={id} {selectTab}>Code</Tab>
    </TabList>
  </svelte:fragment>

  <svelte:fragment slot="panels" let:active let:id>
    <TabPanel id="preview" active={active === 'preview'} baseId={id}>Preview content</TabPanel>
    <TabPanel id="code" active={active === 'code'} baseId={id}>Code content</TabPanel>
  </svelte:fragment>
</Tabs>`;

  onMount(() => {
    lightTheme = initializeTheme() === 'light';
  });

  function handleThemeChange(event: CustomEvent<boolean>) {
    lightTheme = event.detail;
    setTheme(lightTheme ? 'light' : 'dark');
  }

  function deleteProject() {
    deleteDialogOpen = false;
    showToast('The project was deleted.', { title: 'Project deleted', variant: 'success' });
  }

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
<Modal bind:open={deleteDialogOpen} title="Delete Project">
  <p>This action will permanently delete the project and its associated settings. This cannot be undone.</p>
  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => (deleteDialogOpen = false)}>Cancel</Button>
    <Button variant="primary" on:click={deleteProject}>Delete project</Button>
  </svelte:fragment>
</Modal>

<main class="docs-page">
  <div style="max-width: 720px; margin: 0 auto;">
    <header class="docs-header">
      <div>
        <h1 use:useGsap={{ y: 18, opacity: 0, duration: 0.8 }}>UI Library Docs</h1>
        <p use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.1 }}>
          The documentation app is ready to host stories, component examples, and design tokens as the project grows.
        </p>
      </div>
      <Switch bind:checked={lightTheme} label="Use light theme" on:change={handleThemeChange} />
    </header>

    <div class="docs-actions" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.2 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Saving</Button>
      <Button variant="secondary" on:click={() => showToast('The notification system is ready.', { title: 'Success' })}>
        Show toast
      </Button>
      <Button variant="secondary" on:click={() => (deleteDialogOpen = true)}>Delete Project</Button>
      <Dropdown>
        <svelte:fragment slot="trigger" let:open let:toggle>
          <DropdownTrigger {open} on:click={toggle} on:activate={toggle}>Profile</DropdownTrigger>
        </svelte:fragment>
        <svelte:fragment slot="menu">
          <DropdownItem on:select={() => (selectedProfileAction = 'Profile selected')}>View profile</DropdownItem>
          <DropdownItem on:select={() => (selectedProfileAction = 'Settings selected')}>Settings</DropdownItem>
          <DropdownItem on:select={() => (selectedProfileAction = 'Sign out selected')}>Sign out</DropdownItem>
        </svelte:fragment>
      </Dropdown>
    </div>
    <p class="profile-action-status">{selectedProfileAction}</p>

    <section class="tabs-demo" aria-labelledby="tabs-demo-title">
      <div class="tabs-demo__heading">
        <div>
          <p class="tabs-demo__eyebrow">Interactive component</p>
          <h2 id="tabs-demo-title">Code / Preview</h2>
        </div>
        <span class="tabs-demo__state">Active: {activeExampleTab}</span>
      </div>

      <Tabs bind:active={activeExampleTab} id="docs-example">
        <svelte:fragment slot="list" let:active let:selectTab let:id>
          <TabList {active} baseId={id} {selectTab} label="Code and preview">
            <Tab id="preview" active={active === 'preview'} baseId={id} {selectTab}>Preview</Tab>
            <Tab id="code" active={active === 'code'} baseId={id} {selectTab}>Code</Tab>
          </TabList>
        </svelte:fragment>
        <svelte:fragment slot="panels" let:active let:id>
          <TabPanel id="preview" active={active === 'preview'} baseId={id}>
            <div class="preview-surface">
              <span class="preview-surface__eyebrow">Preview state</span>
              <strong>Tabs keep related views together.</strong>
              <span>Use the controls above or keyboard navigation to change this panel.</span>
            </div>
          </TabPanel>
          <TabPanel id="code" active={active === 'code'} baseId={id}>
            <pre class="tabs-demo__code"><code>{exampleSource}</code></pre>
          </TabPanel>
        </svelte:fragment>
      </Tabs>
    </section>

    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
      <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.3 }}>
        <Card title="Core components">
          Buttons and cards form the base layer for the rest of the UI library.
        </Card>
      </div>
      <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.45 }}>
        <Card title="Next phase">
          We will add motion, tokens-driven variants, and a more polished docs system.
        </Card>
      </div>
    </div>

    <section class="tooltip-demo" aria-labelledby="tooltip-demo-title" use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.6 }}>
      <div class="tooltip-demo__header">
        <div>
          <p class="tooltip-demo__eyebrow">Contextual help</p>
          <h2 id="tooltip-demo-title">Tooltip</h2>
        </div>
      </div>

      <div class="tooltip-demo__row">
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful context for the current action.</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>Focus me</TooltipTrigger>
          <TooltipContent>Keyboard users can access this too.</TooltipContent>
        </Tooltip>
      </div>
    </section>

    <a href="/form-validation" class="docs-link">
      Form &amp; Validation guide
    </a>

    <div use:useGsap={{ y: 18, opacity: 0, duration: 0.8, delay: 0.7 }}>
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

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; }

  :global(body) {
    margin: 0;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
  }

  .docs-page {
    min-height: 100vh;
    padding: var(--space-8) var(--space-6);
    background: var(--color-bg);
    color: var(--color-text);
  }

  .docs-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }

  .docs-header h1 {
    margin: 0 0 var(--space-3);
    font-size: var(--text-4xl);
    line-height: var(--leading-tight);
  }

  .docs-header p {
    max-width: 64ch;
    margin: 0;
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  .docs-actions {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-8);
  }

  .docs-link {
    display: inline-block;
    margin-bottom: var(--space-6);
    color: var(--color-text);
    text-underline-offset: 0.2em;
  }

  .profile-action-status {
    margin: calc(-1 * var(--space-5)) 0 var(--space-6);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }

  .tabs-demo {
    margin: var(--space-8) 0;
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  .tabs-demo__heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
  }

  .tabs-demo__eyebrow {
    margin: 0 0 var(--space-1);
    color: var(--color-accent);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }

  .tabs-demo__heading h2 {
    margin: 0;
    font-size: var(--text-xl);
    line-height: var(--leading-tight);
  }

  .tabs-demo__state {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
  }

  .tooltip-demo {
    margin: var(--space-8) 0;
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .tooltip-demo__header {
    margin-bottom: var(--space-4);
  }

  .tooltip-demo__eyebrow {
    margin: 0 0 var(--space-1);
    color: var(--color-accent);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }

  .tooltip-demo h2 {
    margin: 0;
    font-size: var(--text-xl);
    line-height: var(--leading-tight);
  }

  .tooltip-demo__row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    align-items: center;
  }

  .preview-surface {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .preview-surface strong { color: var(--color-text); }

  .preview-surface__eyebrow {
    color: var(--color-success);
    font-weight: var(--weight-medium);
  }

  .tabs-demo__code {
    overflow-x: auto;
    margin: 0;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .tabs-demo__code code {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    white-space: pre;
  }

  @media (max-width: 620px) {
    .docs-page { padding: var(--space-6) var(--space-4); }
    .docs-header { flex-direction: column; }
  }
</style>
