---
title: Trail notes
layout: layout.njk
---

Two walks, written down so the next person can follow them.

## Walks

{% for note in collections.note -%}
* [{{ note.data.title }}]({{ note.filePathStem }}/) — {{ note.data.summary }}
{% endfor %}
