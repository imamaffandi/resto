const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section>
        <span id={idName}></span>
        <Component />
      </section>
    );
  };

export default SectionWrapper;
