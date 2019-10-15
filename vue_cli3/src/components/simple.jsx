const Simple = {
    props: {
        loading: false
    },
    render() {
        let { loading } = this.$props;
        if (loading) {
            return <p>hello</p>
        }
        return this.$slots.default && this.$slots.default[0];
    }
}

export default Simple;