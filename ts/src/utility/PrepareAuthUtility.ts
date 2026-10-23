
import { Context, Spec } from '../types'


const CRED_name = 'authorization'

const OPTION_apikey = 'apikey'
const OPTION_secret = 'secret'

const NOTFOUND = '__NOTFOUND__'


// The client's `auth.name` option, when set, replaces the name the API declares.
function credName(name: any): string {
  return 'string' === typeof name && '' !== name ? name.toLowerCase() : CRED_name
}


function prepareAuth(ctx: Context): Spec | Error {
  const utility = ctx.utility

  const struct = utility.struct
  const getprop = struct.getprop
  const setprop = struct.setprop
  const delprop = struct.delprop

  const client = ctx.client
  const spec = ctx.spec

  if (null == spec) {
    return ctx.error('auth_no_spec', 'Expected context spec property to be defined.')
  }

  const headers = spec.headers

  const options = client.options()

  // Public APIs that need no auth omit the options.auth block entirely.
  if (null == options.auth) {
    delprop(headers, CRED_name)
    return spec
  }

  const prefix = options.auth.prefix
  const name = credName(options.auth.name)

  // A credential left under the declared name would travel beside the renamed one.
  if (CRED_name !== name) {
    delprop(headers, CRED_name)
  }

  const apikey = getprop(options, OPTION_apikey, NOTFOUND)

  // True HTTP Basic Auth joins the two credentials, base64-encoded - a single
  // token in the header (the branch below) can never authenticate against
  // an API that actually checks `Authorization: Basic base64(user:pass)`.
  // The password may be empty (RFC 7617): Lob, for one, documents the key as
  // the user with a blank password (`curl -u key:`).
  if (true === options.auth.basic) {
    const secret = getprop(options, OPTION_secret, NOTFOUND)
    const noApikey = NOTFOUND === apikey || null == apikey || '' === apikey
    const pass = NOTFOUND === secret || null == secret ? '' : secret

    if (noApikey) {
      delprop(headers, name)
    }
    else {
      const b64 = Buffer.from(apikey + ':' + pass).toString('base64')
      // The joined, encoded pair is a wire form neither credential's own
      // registration covers.
      utility.cleanAdd(ctx, b64)
      setprop(headers, name, prefix ? prefix + ' ' + b64 : b64)
    }

    return spec
  }

  if (NOTFOUND === apikey || null == apikey || '' === apikey) {
    delprop(headers, name)
  }
  else {
    // A raw credential (empty prefix, e.g. an apiKey scheme) must go in
    // as-is; only a non-empty prefix (Bearer/Basic/OAuth) is space-joined.
    setprop(headers, name, prefix ? prefix + ' ' + apikey : apikey)
  }

  return spec
}


export {
  prepareAuth
}
