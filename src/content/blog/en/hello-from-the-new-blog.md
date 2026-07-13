---
title: Automating deployments with Ansible — from chaos to repeatability
description: How Ansible and open source tools turn manual, risky deployments into a repeatable process that everyone on the team understands the same way.
pubDate: 2026-07-12
tags: ["automation", "Ansible", "open source"]
draft: false
surface: |
  Manual deployments are a quiet cost that companies only notice when something breaks. Someone logs into a server, runs a dozen commands from memory, and at 5 PM on a Friday it turns out one step was missing in production. **Automation with Ansible** turns that chaos into a repeatable, predictable process.

  Ansible is an open, free tool (developed by Red Hat) that describes the state of your infrastructure in plain, readable text files. Instead of a "what to click" runbook, you have a single document that brings servers to the desired state on its own — and does it the same way every time.

  ## What the business gains

  - **Fewer human errors** — the process is written once and executed identically, with no improvisation.
  - **Faster deployments** — what used to take half a day now runs with a single command in minutes.
  - **No dependency on one person** — knowledge lives in a repository the whole team can see, not in one admin's head.
  - **No license costs** — Ansible is open source, so you pay for results, not for the tool.

  In short: less stress on every release and real time savings for the team. It is one of the first steps we take with our clients.
dive: |
  Automation with Ansible rests on a few simple building blocks worth understanding as a team lead — even without writing code yourself.

  ## How it works in practice

  Ansible is **agentless**: you install nothing on the target servers. It connects over SSH and runs the tasks you define. Three concepts sit at the heart of the approach:

  - **Inventory** — a list of machines grouped into roles (e.g. `web`, `db`, `staging`).
  - **Playbook** — a YAML file describing *what* should be true on a server (e.g. "nginx installed and running").
  - **Roles** — reusable bundles of tasks that you compose like building blocks across projects.

  The key property is **idempotency**: running a playbook ten times produces the same result as running it once. Ansible checks the current state and changes only what needs changing. That is why the same file is safe to apply on a first install and on a small tweak alike.

  ## Trade-offs worth knowing

  Ansible excels at server configuration and application deployment. At very large scale (hundreds of machines, frequent changes) it is worth pairing with tools like Terraform to manage the cloud infrastructure itself. This is not an "either-or" — the tools complement each other well, and Ansible is usually the simplest place to start.
depth: |
  Below is a minimal but realistic playbook that installs and configures nginx and guarantees the service is running. It is fully idempotent.

  ## Sample playbook

  ```yaml
  ---
  - name: Configure web server
    hosts: web
    become: true
    vars:
      app_domain: redpulse.example.com
    tasks:
      - name: Install nginx
        ansible.builtin.package:
          name: nginx
          state: present

      - name: Deploy vhost configuration
        ansible.builtin.template:
          src: templates/vhost.conf.j2
          dest: "/etc/nginx/conf.d/{{ app_domain }}.conf"
          owner: root
          mode: "0644"
        notify: Reload nginx

      - name: Ensure nginx is running
        ansible.builtin.service:
          name: nginx
          state: started
          enabled: true

    handlers:
      - name: Reload nginx
        ansible.builtin.service:
          name: nginx
          state: reloaded
  ```

  ## Inventory structure

  We group machines in an `inventory.ini` file so the same playbook serves both staging and production:

  ```ini
  [web]
  web-01.redpulse.example.com
  web-02.redpulse.example.com

  [web:vars]
  ansible_user=deploy
  ```

  Run it with: `ansible-playbook -i inventory.ini site.yml`. Add `--check` for a dry run (it shows changes without applying them) and `--diff` to see exactly which config lines will change. The `Reload nginx` handler fires **only** when the template actually changed — that is idempotency in action.
---
