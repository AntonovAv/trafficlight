{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ],
      "ldflags": [
        "-Wl,-z,defs"
      ]
    }
  ]
}
