<script lang="ts">
  import { Input } from '@web-queen/core';

  let defaultBound = '';
  let filledBound = 'team@webqueen.dev';
  let ghostBound = '';
  let successBound = 'web-queen-core';
  let errorBound = 'not-an-email';
  let animatedBound = '';
</script>

<svelte:head>
  <title>Input stories — Web Queen</title>
  <meta name="description" content="Every Input variant, size and validation status." />
</svelte:head>

<main class="page">
  <header class="page__head">
    <h1 class="page__title">Input</h1>
    <p class="page__lead">
      Variants, sizes and validation states. Every visual value comes from a token, so both themes
      resolve automatically.
    </p>
  </header>

  <section class="story">
    <h2 class="story__title">Default</h2>
    <p class="story__note">No props beyond the label — <code>variant=default</code>, <code>size=md</code>, <code>status=idle</code>.</p>
    <Input label="Project name" placeholder="Enter project name" bind:value={defaultBound} />
  </section>

  <section class="story">
    <h2 class="story__title">Variants</h2>
    <p class="story__note">default · filled · ghost</p>
    <div class="row">
      <Input variant="default" label="Default" placeholder="Surface raised" bind:value={defaultBound} />
      <Input variant="filled" label="Filled" placeholder="Surface" bind:value={filledBound} />
      <Input variant="ghost" label="Ghost" placeholder="Underline only" bind:value={ghostBound} />
    </div>
  </section>

  <section class="story">
    <h2 class="story__title">Sizes</h2>
    <p class="story__note">sm (32px) · md (40px) · lg (48px)</p>
    <div class="row row--baseline">
      <Input size="sm" label="Small" placeholder="32px" />
      <Input size="md" label="Medium" placeholder="40px" />
      <Input size="lg" label="Large" placeholder="48px" />
    </div>
  </section>

  <section class="story">
    <h2 class="story__title">Status</h2>
    <p class="story__note">
      Error pairs the danger colour with an icon and text — never colour alone.
    </p>
    <div class="row">
      <Input
        status="error"
        label="Owner email"
        placeholder="name@company.com"
        errorMessage="Enter a valid email address."
        bind:value={errorBound}
      />
      <Input
        status="success"
        label="Workspace slug"
        placeholder="workspace-slug"
        hint="This slug is available."
        bind:value={successBound}
      />
    </div>
  </section>

  <section class="story">
    <h2 class="story__title">Disabled</h2>
    <p class="story__note">Not focusable, reduced opacity, disabled cursor.</p>
    <div class="row">
      <Input label="Disabled field" placeholder="Unavailable" disabled />
      <Input label="Disabled with hint" placeholder="Unavailable" disabled hint="You need admin rights to edit this." />
    </div>
  </section>

  <section class="story">
    <h2 class="story__title">Label + hint</h2>
    <p class="story__note">Label is a real <code>&lt;label for&gt;</code>; hint is linked by <code>aria-describedby</code>.</p>
    <div class="row">
      <Input
        label="Contact email"
        hint="Used for product updates and invites."
        placeholder="you@example.com"
        required
        bind:value={filledBound}
      />
    </div>
  </section>

  <section class="story">
    <h2 class="story__title">Animation (packages/motion)</h2>
    <p class="story__note">
      <code>animation</code> maps to a motion preset. With reduced motion preferred the action
      returns a no-op and the field renders immediately.
    </p>
    <div class="row row--baseline">
      <Input animation="fade-in" label="fade-in" placeholder="Fades in" bind:value={animatedBound} />
      <Input animation="slide-up" label="slide-up" placeholder="Slides up" />
      <Input animation="scale-in" label="scale-in" placeholder="Scales in" />
    </div>
  </section>
</main>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    max-width: 980px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6);
  }

  .page__head {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .page__title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
  }

  .page__lead {
    margin: 0;
    max-width: 62ch;
    color: var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .story__title {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
  }

  .story__note {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .story__note code {
    font-size: var(--text-sm);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .row--baseline {
    align-items: flex-end;
  }
</style>
