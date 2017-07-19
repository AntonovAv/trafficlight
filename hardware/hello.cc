// hello.cc
#include <node.h>
#include "i2c_lib.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::HandleScope;

int address;
int fd;

void Open(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  String::Utf8Value dev(args[0]);
  uint8_t addr = args[1]->NumberValue();
  
  fd = i2c_open(*dev, addr);
}

void SetDuty(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));

  uint8_t data[] = {1, 2, 3, 4};
  i2c_send(fd, data, 4);
}

void SetFrequncy(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "setDuty", SetDuty);
  NODE_SET_METHOD(exports, "setFrequncy", SetFrequncy);
  NODE_SET_METHOD(exports, "open", Open);
}

NODE_MODULE(addon, init)

}
