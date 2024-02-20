// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assertShadowRoot, renderElementIntoDOM} from '../../../../test/unittests/front_end/helpers/DOMHelpers.js';
import {describeWithEnvironment} from '../../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import * as Elements from '../elements.js';

import * as ElementsComponents from './components.js';

const {assert} = chai;

describeWithEnvironment('CSSHintDetailsView', async () => {
  it('renders every section', async () => {
    const hintMessage = new Elements.CSSRuleValidator.Hint(
        'This element has <code class="unbreakable-text"><span class="property">flex-wrap</span>: nowrap</code> rule, therefore <code class="unbreakable-text"><span class="property">align-content</span></code> has no effect.',
        'For this property to work, please remove or change the value of <code class="unbreakable-text"><span class="property">flex-wrap</span></code> rule.',
        'align-content',
    );

    const popupComponent = new ElementsComponents.CSSHintDetailsView.CSSHintDetailsView(hintMessage);
    renderElementIntoDOM(popupComponent);

    assertShadowRoot(popupComponent.shadowRoot);

    const shadowRoot = popupComponent.shadowRoot;

    const popupReasonRendered = shadowRoot.querySelector('.hint-popup-reason') !== null;
    const popupPossibleFixRendered = shadowRoot.querySelector('.hint-popup-possible-fix') !== null;
    const popupLearnMoreRendered = shadowRoot.querySelector('#learn-more') !== null;

    assert.isTrue(popupReasonRendered);
    assert.isTrue(popupPossibleFixRendered);
    assert.isTrue(popupLearnMoreRendered);
  });

  it('does not render learn more', async () => {
    const hint = new Elements.CSSRuleValidator.Hint(
        'This element has <code class="unbreakable-text"><span class="property">flex-wrap</span>: nowrap</code> rule, therefore <code class="unbreakable-text"><span class="property">align-content</span></code> has no effect.',
        'For this property to work, please remove or change the value of <code class="unbreakable-text"><span class="property">flex-wrap</span></code> rule.',
    );

    const popupComponent = new ElementsComponents.CSSHintDetailsView.CSSHintDetailsView(hint);
    renderElementIntoDOM(popupComponent);

    assertShadowRoot(popupComponent.shadowRoot);

    const shadowRoot = popupComponent.shadowRoot;

    assert(shadowRoot.querySelector('.hint-popup-reason') !== null);
    assert(shadowRoot.querySelector('.hint-popup-possible-fix') !== null);
    assert(shadowRoot.querySelector('#learn-more') === null);
  });
});
