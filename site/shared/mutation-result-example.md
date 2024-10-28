<!--
<script setup>
const mutate = 'mutationFn'
const TVariables = 'TVariables'
</script>
-->

<br />

---

#### Example: {{mutate}} with Optional Hooks

```tsx-vue
{{mutate}}(
  {
    //{{TVariables}}
    //refer to "Usage"
  },
  {
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onSettled: (data) => {
      console.log("Settled", data);
    },
    onError: (error) => {
      console.error("Error", error);
    },
  }
);
```
